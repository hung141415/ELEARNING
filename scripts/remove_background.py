import os
import sys
from PIL import Image
import rembg

def process_all_images():
    output_dir = "public/image/cutout"
    os.makedirs(output_dir, exist_ok=True)
    
    # Try silueta first for fine human portrait edges, fallback to u2netp
    try:
        print("Initializing silueta session for fine-detail portrait matting...")
        session = rembg.new_session("silueta")
    except Exception as e:
        print(f"Silueta init error: {e}, falling back to u2netp...")
        session = rembg.new_session("u2netp")
        
    for i in range(1, 6):
        input_file = f"public/image/{i}.jpg"
        output_file = f"{output_dir}/{i}.png"
        if not os.path.exists(input_file):
            print(f"File not found: {input_file}")
            continue
            
        print(f"--> Processing {input_file} ...")
        img = Image.open(input_file)
        
        # Remove background using the selected session
        cutout = rembg.remove(img, session=session)
        cutout.save(output_file, "PNG")
        print(f"[OK] Saved {output_file} successfully (size: {cutout.size})")

if __name__ == "__main__":
    process_all_images()
