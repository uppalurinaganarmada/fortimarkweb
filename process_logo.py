import os
from PIL import Image

def main():
    src_path = r"C:\Users\uppal\.gemini\antigravity\brain\e3f10819-f061-4ae3-9168-da791f8a1bea\media__1784377466823.png"
    dest_dir = r"C:\Users\uppal\.gemini\antigravity\scratch\fortimark\assets"
    dest_path = os.path.join(dest_dir, "logo.png")
    
    if not os.path.exists(dest_dir):
        os.makedirs(dest_dir)
        
    img = Image.open(src_path).convert("RGBA")
    width, height = img.size
    
    # Process logo: make background transparent, and change the logo color to white
    logo_color = (255, 255, 255, 255) # Pure White
    transparent = (0, 0, 0, 0)
    
    pixels = img.load()
    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            
            # Check if it is near-white background
            if r > 240 and g > 240 and b > 240:
                pixels[x, y] = transparent
            else:
                # Force all non-transparent pixels to be pure white
                pixels[x, y] = logo_color
                    
    img.save(dest_path, "PNG")
    print(f"Processed white logo saved to {dest_path}")

if __name__ == "__main__":
    main()
