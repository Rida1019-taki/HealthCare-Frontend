import os
import re

def remove_css_imports_and_clear_css():
    for root, dirs, files in os.walk('src'):
        for f in files:
            path = os.path.join(root, f)
            if f.endswith(('.js', '.jsx')):
                # skip index.js and App.js since they import global css (App.css, index.css)
                # actually App.js has App.css, let's just keep App.js untouched or handle it
                if f in ['index.js', 'App.js']:
                    continue
                with open(path, 'r', encoding='utf-8') as file:
                    content = file.read()
                
                # Remove local css imports
                new_content = re.sub(r'import\s+[\'\"].*\.css[\'\"];?\n?', '', content)
                
                if new_content != content:
                    with open(path, 'w', encoding='utf-8') as file:
                        file.write(new_content)
                    print(f"Removed CSS import from {path}")
            
            elif f.endswith('.css'):
                if f not in ['index.css']:
                    with open(path, 'w', encoding='utf-8') as file:
                        file.write('/* Styles moved to index.css */')
                    print(f"Cleared {path}")

remove_css_imports_and_clear_css()
