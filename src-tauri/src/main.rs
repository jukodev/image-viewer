// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{App, Manager, PhysicalSize};
use image;
use image::GenericImageView;

fn main() {
  tauri::Builder::default()
  .setup(|app| {
            set_window_size(app);
            Ok(())
        })
  .invoke_handler(tauri::generate_handler![read_image])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

#[tauri::command]
fn read_image() -> Result<String, String> {
    let file_path = get_image_from_args();
    match std::fs::read(file_path) {
        
        Ok(bytes) => {
            let base64_encoded = base64::encode(bytes);
            Ok(format!("data:image/png;base64,{}", base64_encoded))
        }
        Err(e) => Err(e.to_string()),
    }
}

fn get_image_from_args() -> String {
    let args: Vec<String> = std::env::args().collect();
    let file_path: String;
    if args.len() < 2 {
        file_path = "C:\\Users\\theju\\Pictures\\ergohai.jpg".to_string();  
        //return Err("No file path provided".to_string()); for testing
    }else{
        file_path = args[1].clone();
    
    }
    return file_path;
}

fn set_window_size(app: &mut App) {
    if let Some(window) = app.get_window("main") {
        let file_path = get_image_from_args();
        let img = image::open(file_path).unwrap();
        let (width, height) = img.dimensions();
        window.set_size(PhysicalSize::new(width, height)).unwrap();
    }
}
