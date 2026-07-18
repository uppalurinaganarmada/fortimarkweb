import os
from PIL import Image, ImageDraw

def main():
    src_path = r"C:\Users\uppal\.gemini\antigravity\brain\e3f10819-f061-4ae3-9168-da791f8a1bea\media__1784377466823.png"
    dest_dir = r"C:\Users\uppal\.gemini\antigravity\scratch\fortimark\assets"
    dest_path = os.path.join(dest_dir, "logo.png")
    
    if not os.path.exists(dest_dir):
        os.makedirs(dest_dir)
        
    img = Image.open(src_path).convert("RGBA")
    width, height = img.size
    
    # We will iterate over pixels:
    # 1. Turn white background transparent
    # 2. Force the rook color to a solid, rich dark black/navy (11, 19, 56, 255)
    # 3. Fill the text area in the base to erase "FORTIMARK.STUDIO"
    
    logo_color = (11, 19, 56, 255)
    transparent = (0, 0, 0, 0)
    
    pixels = img.load()
    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            
            # Check if it is near-white background
            if r > 240 and g > 240 and b > 240:
                pixels[x, y] = transparent
            else:
                # If it's logo shape:
                if y >= 550:
                    # In the base area, erase text by coloring all non-white pixels to solid logo color
                    pixels[x, y] = logo_color
                else:
                    # Rest of the logo, make it solid logo color for absolute consistency
                    pixels[x, y] = logo_color
                    
    img.save(dest_path, "PNG")
    print(f"Processed logo saved to {dest_path}")

if __name__ == "__main__":
    main()
