use std::fs;
use serde::{Serialize,Deserialize};
use tauri::{AppHandle, Manager};

// データ型の定義
#[derive(Serialize,Deserialize)]
pub struct UrlInfoContextType{
    pub id: u64,
    pub title: String,
    pub url: String,
    pub date: String,
}

// データを保存する関数
#[tauri::command]
fn save_data(app_handle:AppHandle,data:Vec<UrlInfoContextType>) -> Result<(),String>{
    let json_data = serde_json::to_string(&data).map_err(|e| e.to_string())?;
    let mut path = app_handle.path().app_local_data_dir().unwrap();
    path.push("data.json");
    fs::write(path,json_data).map_err(|e| e.to_string())?;
    Ok(())
}

// データを読み込む関数
#[tauri::command]
fn load_data(app_handle:AppHandle) -> Result<Vec<UrlInfoContextType>,String>{
    let mut path = app_handle.path().app_local_data_dir().unwrap();
    path.push("data.json");
    if !path.exists(){
        fs::write(&path, "[]").map_err(|e| e.to_string())?;
    }
    let json_data = fs::read_to_string(path).map_err(|e| e.to_string())?;
    let data:Vec<UrlInfoContextType> = serde_json::from_str(&json_data).map_err(|e| e.to_string())?;
    Ok(data)
}

// jsonファイルを書き込む先のディレクトリを確認するための関数
#[tauri::command]
fn path_watch(app_handle:AppHandle) -> Result<(),String>{
    let path = app_handle.path().app_local_data_dir().unwrap();
    println!("Save path: {:?}", path);
    Ok(())
}

// バージョン情報の取得をする関数
#[tauri::command]
fn get_version() -> Result<String,String>{
    let version = env!("CARGO_PKG_VERSION").to_string();
    Ok(version)
}


#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![path_watch,load_data,save_data,get_version])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
