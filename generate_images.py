import os
from PIL import Image, ImageDraw, ImageFilter
import math

# Create AWS Infrastructure Automation 3D image
def create_aws_infrastructure_3d():
    width, height = 1200, 800
    img = Image.new('RGB', (width, height), color='#0f172a')
    draw = ImageDraw.Draw(img, 'RGBA')
    
    # Background gradient simulation with rectangles
    for i in range(height):
        r = int(15 + (30-15) * (i/height))
        g = int(23 + (41-23) * (i/height))
        b = int(42 + (59-42) * (i/height))
        draw.rectangle([(0, i), (width, i+1)], fill=(r, g, b))
    
    # Title
    draw.text((600, 40), "AWS Infrastructure Automation Platform", fill=(255, 255, 255), anchor="mm")
    draw.text((600, 80), "Terraform • EKS • VPC • Kubernetes", fill=(148, 163, 184), anchor="mm")
    
    # Draw 3D cubes for infrastructure components
    def draw_3d_cube(x, y, size, color, label):
        # Front face
        points_front = [(x, y), (x + size, y), (x + size, y + size), (x, y + size)]
        draw.polygon(points_front, fill=color, outline=(255, 255, 255))
        
        # Top face (3D effect)
        points_top = [(x, y), (x + size//4, y - size//4), (x + size + size//4, y - size//4), (x + size, y)]
        draw.polygon(points_top, fill=tuple(max(0, c-40) for c in color), outline=(200, 200, 200))
        
        # Right face (3D effect)
        points_right = [(x + size, y), (x + size + size//4, y - size//4), (x + size + size//4, y + size - size//4), (x + size, y + size)]
        draw.polygon(points_right, fill=tuple(max(0, c-60) for c in color), outline=(150, 150, 150))
        
        # Draw label
        draw.text((x + size//2, y + size//2), label, fill=(255, 255, 255), anchor="mm")
    
    # VPC Layer
    draw.text((150, 200), "VPC & Networking", fill=(0, 212, 255), anchor="lm")
    draw_3d_cube(100, 250, 80, (0, 212, 255, 180), "VPC")
    draw_3d_cube(250, 250, 80, (0, 212, 255, 140), "Subnet")
    draw_3d_cube(400, 250, 80, (0, 212, 255, 140), "IGW")
    draw_3d_cube(550, 250, 80, (0, 212, 255, 140), "NAT")
    
    # EKS Layer
    draw.text((150, 420), "EKS Cluster", fill=(50, 206, 229), anchor="lm")
    draw_3d_cube(100, 470, 100, (50, 206, 229, 200), "CP")
    draw_3d_cube(280, 470, 100, (50, 206, 229, 160), "N1")
    draw_3d_cube(460, 470, 100, (50, 206, 229, 160), "N2")
    draw_3d_cube(640, 470, 100, (50, 206, 229, 160), "N3")
    
    # Terraform Layer
    draw.text((150, 640), "Terraform Management", fill=(118, 75, 162), anchor="lm")
    draw_3d_cube(100, 690, 90, (118, 75, 162, 180), "Mod")
    draw_3d_cube(280, 690, 90, (118, 75, 162, 140), "WS")
    draw_3d_cube(460, 690, 90, (118, 75, 162, 140), "Vars")
    draw_3d_cube(640, 690, 90, (118, 75, 162, 140), "Env")
    
    # State Management
    draw.text((800, 200), "State Management", fill=(255, 153, 0), anchor="lm")
    draw_3d_cube(800, 250, 80, (255, 153, 0, 180), "S3")
    draw_3d_cube(950, 250, 80, (255, 153, 0, 140), "DDB")
    
    img.save('images/aws_infrastructure_automation.png')
    print("Created aws_infrastructure_automation.png")

# Create CI/CD Pipeline 3D image
def create_cicd_pipeline_3d():
    width, height = 1200, 800
    img = Image.new('RGB', (width, height), color='#0f172a')
    draw = ImageDraw.Draw(img, 'RGBA')
    
    # Background gradient
    for i in range(height):
        r = int(15 + (30-15) * (i/height))
        g = int(23 + (41-23) * (i/height))
        b = int(42 + (59-42) * (i/height))
        draw.rectangle([(0, i), (width, i+1)], fill=(r, g, b))
    
    # Title
    draw.text((600, 40), "Multi-Environment CI/CD Pipeline", fill=(255, 255, 255), anchor="mm")
    draw.text((600, 80), "Jenkins • Docker • Kubernetes • GitHub", fill=(148, 163, 184), anchor="mm")
    
    # Draw 3D sphere for pipeline stages
    def draw_3d_sphere(x, y, radius, color, label):
        # Main sphere
        draw.ellipse([x-radius, y-radius, x+radius, y+radius], fill=color, outline=(255, 255, 255))
        # Highlight (3D effect)
        highlight_rad = radius // 3
        draw.ellipse([x-highlight_rad, y-highlight_rad-radius//3, x+highlight_rad, y-highlight_rad], 
                    fill=tuple(min(255, c+80) for c in color), outline=None)
        # Label
        draw.text((x, y), label, fill=(255, 255, 255), anchor="mm")
    
    # Pipeline stages with 3D spheres
    colors = [(0, 255, 136), (8, 131, 149), (249, 115, 22), (36, 108, 229), (233, 30, 99)]
    stages = ["Code", "Build", "Test", "Image", "Deploy"]
    x_positions = [150, 350, 550, 750, 950]
    
    for i, (stage, x, color) in enumerate(zip(stages, x_positions, colors)):
        draw_3d_sphere(x, 250, 50, color, stage)
        
        # Draw arrows between stages
        if i < len(stages) - 1:
            draw.line([(x + 55, 250), (x_positions[i+1] - 55, 250)], fill=(102, 126, 234), width=3)
            draw.polygon([(x_positions[i+1] - 50, 240), (x_positions[i+1] - 40, 250), (x_positions[i+1] - 50, 260)], 
                        fill=(102, 126, 234))
    
    # Approval Gates Section
    draw.rectangle([(50, 380), (1150, 520)], outline=(233, 30, 99), width=2)
    draw.text((600, 400), "🔐 Approval Gates & Controls", fill=(233, 30, 99), anchor="mm")
    
    gates = ["QA\nGate", "UAT\nGate", "Prod\nGate"]
    gate_x = [300, 600, 900]
    for gate_name, gx in zip(gates, gate_x):
        draw.rectangle([(gx-60, 440), (gx+60, 500)], fill=(233, 30, 99, 100), outline=(233, 30, 99), width=2)
        draw.text((gx, 470), gate_name, fill=(233, 30, 99), anchor="mm")
    
    # Environments
    draw.text((600, 560), "Deployment Environments", fill=(148, 163, 184), anchor="mm")
    
    envs = ["DEV", "QA", "UAT", "Prod"]
    env_colors = [(0, 212, 255), (0, 212, 255), (0, 212, 255), (249, 115, 22)]
    env_x = [250, 500, 750, 1000]
    
    for env_name, ex, env_color in zip(envs, env_x, env_colors):
        draw.rectangle([(ex-70, 610), (ex+70, 680)], fill=(*env_color, 100), outline=env_color, width=2)
        draw.text((ex, 645), env_name, fill=env_color, anchor="mm")
    
    img.save('images/cicd_pipeline_3d.png')
    print("Created cicd_pipeline_3d.png")

create_aws_infrastructure_3d()
create_cicd_pipeline_3d()
