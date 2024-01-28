// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
  tauri::Builder::default()
  .invoke_handler(tauri::generate_handler![read_image])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

#[tauri::command]
fn read_image(file_path: String) -> Result<String, String> {
    match std::fs::read(file_path) {
        Ok(bytes) => {
            let base64_encoded = base64::encode(bytes);
            Ok(format!("data:image/png;base64,{}", base64_encoded))
        }
        Err(e) => Err(e.to_string()),
    }
}
