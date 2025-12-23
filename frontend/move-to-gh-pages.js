const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, 'docs');
const browserDir = path.join(docsDir, 'browser');

// Se a pasta browser existe, move os arquivos para docs/
if (fs.existsSync(browserDir)) {
  const files = fs.readdirSync(browserDir);
  
  files.forEach(file => {
    const srcPath = path.join(browserDir, file);
    const destPath = path.join(docsDir, file);
    
    // Move arquivo ou pasta
    if (fs.existsSync(destPath)) {
      if (fs.statSync(destPath).isDirectory()) {
        fs.rmSync(destPath, { recursive: true, force: true });
      } else {
        fs.unlinkSync(destPath);
      }
    }
    
    fs.renameSync(srcPath, destPath);
  });
  
  // Remove a pasta browser vazia
  if (fs.existsSync(browserDir)) {
    fs.rmdirSync(browserDir);
  }
}

// Cria arquivo .nojekyll para desabilitar o processamento Jekyll
const nojekyllPath = path.join(docsDir, '.nojekyll');
fs.writeFileSync(nojekyllPath, '');
console.log('✅ Arquivo .nojekyll criado/atualizado');

// Cria arquivo _config.yml mínimo para desabilitar Jekyll explicitamente
const configPath = path.join(docsDir, '_config.yml');
const configContent = `# Desabilita completamente o Jekyll
# Este arquivo garante que o GitHub Pages não tente processar com Jekyll
plugins: []
`;
fs.writeFileSync(configPath, configContent);
console.log('✅ Arquivo _config.yml criado/atualizado');

console.log('✅ Arquivos movidos para a raiz de docs/');

