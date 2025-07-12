from PIL import Image, ImageDraw, ImageFont
import os

def create_favicon():
    """Cria um favicon.ico personalizado para EasyTalk"""
    
    # Tamanhos padrão para favicon
    sizes = [16, 24, 32, 48, 64]
    images = []
    
    for size in sizes:
        # Criar uma nova imagem
        img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
        draw = ImageDraw.Draw(img)
        
        # Cores do design (indigo)
        bg_color = (79, 70, 229)  # indigo-600
        border_color = (55, 48, 163)  # indigo-700
        text_color = (255, 255, 255)  # white
        bubble_color = (255, 255, 255, 230)  # white with transparency
        
        # Desenhar círculo de fundo
        margin = max(1, size // 16)
        draw.ellipse([margin, margin, size-margin, size-margin], 
                    fill=bg_color, outline=border_color, width=max(1, size//32))
        
        # Desenhar balão de fala (speech bubble)
        bubble_margin = size // 4
        bubble_width = size - (bubble_margin * 2)
        bubble_height = bubble_width // 2
        
        # Coordenadas do balão
        x1 = bubble_margin
        y1 = bubble_margin
        x2 = x1 + bubble_width
        y2 = y1 + bubble_height
        
        # Desenhar retângulo arredondado para o balão
        radius = max(2, size // 16)
        draw.rounded_rectangle([x1, y1, x2, y2], radius=radius, fill=bubble_color)
        
        # Pequena "cauda" do balão de fala
        tail_size = max(2, size // 8)
        tail_x = x1 + bubble_width // 4
        tail_y = y2
        draw.polygon([
            (tail_x, tail_y),
            (tail_x + tail_size, tail_y + tail_size),
            (tail_x + tail_size*2, tail_y)
        ], fill=bubble_color)
        
        # Adicionar letra "E" no centro
        try:
            # Tentar usar uma fonte do sistema
            font_size = max(6, size // 3)
            try:
                font = ImageFont.truetype("arial.ttf", font_size)
            except:
                try:
                    font = ImageFont.truetype("C:/Windows/Fonts/arial.ttf", font_size)
                except:
                    font = ImageFont.load_default()
            
            # Desenhar a letra "E"
            text = "E"
            bbox = draw.textbbox((0, 0), text, font=font)
            text_width = bbox[2] - bbox[0]
            text_height = bbox[3] - bbox[1]
            
            text_x = (size - text_width) // 2
            text_y = (size - text_height) // 2 - size // 16
            
            draw.text((text_x, text_y), text, fill=bg_color, font=font)
            
        except Exception as e:
            print(f"Erro ao adicionar texto: {e}")
            # Fallback: desenhar um círculo simples no centro
            center = size // 2
            circle_size = max(2, size // 8)
            draw.ellipse([center-circle_size, center-circle_size, 
                         center+circle_size, center+circle_size], fill=bg_color)
        
        # Adicionar pequenos pontos decorativos (representando conversação)
        if size >= 24:
            dot_size = max(1, size // 32)
            dot_y = y1 + bubble_height // 3
            dot_spacing = bubble_width // 5
            
            for i in range(3):
                dot_x = x1 + dot_spacing + (i * dot_spacing)
                draw.ellipse([dot_x-dot_size, dot_y-dot_size, 
                             dot_x+dot_size, dot_y+dot_size], fill=bg_color)
        
        images.append(img)
    
    # Salvar como favicon.ico
    favicon_path = os.path.join(os.getcwd(), 'public', 'favicon.ico')
    
    # Garantir que o diretório public existe
    os.makedirs(os.path.dirname(favicon_path), exist_ok=True)
    
    # Salvar o favicon com múltiplos tamanhos
    images[0].save(favicon_path, format='ICO', sizes=[(img.width, img.height) for img in images], 
                   append_images=images[1:])
    
    print(f"✅ Favicon criado com sucesso: {favicon_path}")
    print(f"📏 Tamanhos incluídos: {[f'{img.width}x{img.height}' for img in images]}")
    
    # Também criar uma versão PNG para usar em outros lugares
    png_path = os.path.join(os.getcwd(), 'public', 'favicon.png')
    images[2].save(png_path, format='PNG')  # Usar o tamanho 32x32 para PNG
    print(f"📱 PNG criado: {png_path}")

if __name__ == "__main__":
    create_favicon()
