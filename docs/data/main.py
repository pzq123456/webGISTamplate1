import pandas as pd
import geopandas as gpd
import os
from tqdm import tqdm
import json
from shapely.geometry import Polygon

DIR = os.path.dirname(os.path.abspath(__file__))
PATH = os.path.join(DIR, 'points2024.json')
OUTPUT_PATH = os.path.join(DIR, 'points2024_fixed.json')

def load_data():
    """加载JSON数据并创建GeoDataFrame（保持WGS84坐标系）"""
    print("正在加载数据...")
    with open(PATH, 'r') as f:
        data = json.load(f)
    
    # 使用tqdm显示进度条（针对大数据集）
    df = pd.DataFrame(tqdm(data, desc="加载进度"), columns=['lon', 'lat', 'count'])
    
    # 创建GeoDataFrame（保持EPSG:4326坐标系）
    gdf = gpd.GeoDataFrame(
        df, 
        geometry=gpd.points_from_xy(df.lon, df.lat),
        crs='EPSG:4326'
    )
    gdf['count'] = gdf['count'].astype(int)
    return gdf

def define_exclusion_areas():
    """定义要排除的矩形区域（WGS84坐标）"""
    exclusion_areas = [
        # 区域1: 台湾海峡附近
        {
            'min_lon': 119.237765,
            'max_lat': 26.491915,
            'max_lon': 124.356133,
            'min_lat': 20.726724
        },
        # 区域2: 珠江口附近
        {
            'min_lon': 112.379709,
            'max_lat': 22.667155,
            'max_lon': 114.908172,
            'min_lat': 21.857895
        },
        # 可添加更多区域...
    ]
    return exclusion_areas

def create_exclusion_polygons(exclusion_areas):
    """创建排除区域的多边形（WGS84坐标系）"""
    return [
        Polygon([
            (area['min_lon'], area['max_lat']),
            (area['max_lon'], area['max_lat']),
            (area['max_lon'], area['min_lat']),
            (area['min_lon'], area['min_lat'])
        ])
        for area in exclusion_areas
    ]

def remove_areas(gdf, exclusion_polygons):
    """移除指定区域内的点"""
    print("正在过滤数据...")
    
    # 创建排除区域的GeoDataFrame
    exclusion_gdf = gpd.GeoDataFrame(
        geometry=exclusion_polygons,
        crs='EPSG:4326'
    )
    
    # 使用空间连接快速找出不在排除区域内的点
    filtered_gdf = gpd.sjoin(
        gdf,
        exclusion_gdf,
        how='left',
        predicate='within'
    )
    # 保留不在任何排除区域内的点（即join结果为NaN的点）
    filtered_gdf = filtered_gdf[filtered_gdf.index_right.isna()]
    
    return filtered_gdf[['geometry', 'count']]

def save_data(gdf):
    """保存为原始JSON格式"""
    print("正在准备保存数据...")
    data = [
        [point.x, point.y, count]
        for point, count in tqdm(
            zip(gdf.geometry, gdf['count']),
            total=len(gdf),
            desc="转换进度"
        )
    ]
    
    print("正在保存数据...")
    with open(OUTPUT_PATH, 'w') as f:
        json.dump(data, f)

if __name__ == "__main__":
    # 加载数据（保持WGS84坐标系）
    gdf = load_data()
    print(f"原始数据点数: {len(gdf):,}")
    
    # 定义排除区域
    exclusion_areas = define_exclusion_areas()
    exclusion_polygons = create_exclusion_polygons(exclusion_areas)
    
    # 移除区域内的点
    filtered_gdf = remove_areas(gdf, exclusion_polygons)
    removed_count = len(gdf) - len(filtered_gdf)
    print(f"过滤后数据点数: {len(filtered_gdf):,}")
    print(f"移除的数据点数: {removed_count:,} ({removed_count/len(gdf):.2%})")
    
    # 保存数据
    save_data(filtered_gdf)
    print(f"数据已保存到: {OUTPUT_PATH}")