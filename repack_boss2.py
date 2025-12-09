from PIL import Image
import os

def repack_image():
    input_path = "assets/sprites/boss2/boss2.png"
    output_path = "assets/sprites/boss2/boss2_repacked.png"
    
    if not os.path.exists(input_path):
        print(f"Error: {input_path} not found.")
        return

    try:
        img = Image.open(input_path)
        print(f"Original size: {img.size}")
        
        # Original: 16 columns, 3 rows
        # Frame size verification
        cols_orig = 16
        rows_orig = 3
        frame_width = img.width // cols_orig
        frame_height = img.height // rows_orig
        
        print(f"Frame size: {frame_width}x{frame_height}")
        
        total_frames = cols_orig * rows_orig # 48 frames
        
        # Target: Fits in 2048x2048
        # Try 7 columns -> width = 7 * 288 = 2016 (Fits < 2048)
        cols_new = 7
        import math
        rows_new = math.ceil(total_frames / cols_new)
        
        new_width = cols_new * frame_width
        new_height = rows_new * frame_height
        
        print(f"New size: {new_width}x{new_height}")
        
        if new_width > 2048 or new_height > 2048:
             print("Error: Target dimensions still too large!")
             return

        new_img = Image.new("RGBA", (new_width, new_height))
        
        current_frame = 0
        for y in range(rows_orig):
            for x in range(cols_orig):
                # Extract frame
                left = x * frame_width
                top = y * frame_height
                right = left + frame_width
                bottom = top + frame_height
                frame = img.crop((left, top, right, bottom))
                
                # Paste into new position
                new_x = (current_frame % cols_new) * frame_width
                new_y = (current_frame // cols_new) * frame_height
                
                new_img.paste(frame, (new_x, new_y))
                current_frame += 1
                
        new_img.save(output_path)
        print(f"Saved repacked image to {output_path}")
        
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    repack_image()
