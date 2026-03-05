const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const yaml = require('js-yaml');

const articlesDir = path.join(__dirname, 'articles');
const dataDir = path.join(__dirname, 'datas');
const outputDir = path.join(__dirname, 'output');

function processDirectory(currentArticlesPath) {
    const entries = fs.readdirSync(currentArticlesPath, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(currentArticlesPath, entry.name);

        const relativePath = path.relative(articlesDir, fullPath);

        if (entry.isDirectory()) {
            processDirectory(fullPath);
        } else if (entry.isFile() && entry.name.endsWith('.md')) {
            const parsedPath = path.parse(relativePath);
            const category = parsedPath.dir;
            const slug = parsedPath.name;

            const jsonPath = path.join(dataDir, category, `${slug}.json`);
            const outPath = path.join(outputDir, category, `${slug}.md`);

            let mdContent = fs.readFileSync(fullPath, 'utf8');
            let finalContent = mdContent;

            if (fs.existsSync(jsonPath)) {
                try {
                    const jsonContent = fs.readFileSync(jsonPath, 'utf8');
                    const jsonData = JSON.parse(jsonContent);

                    const yamlOptions = {
                        engines: {
                            yaml: {
                                stringify: (data) => {
                                    return yaml.dump(data, {
                                        flowLevel: 3,
                                        lineWidth: -1,
                                        quotingType: '"'
                                    });
                                }
                            }
                        }
                    };
                    
                    finalContent = matter.stringify(mdContent, jsonData, yamlOptions);
                    console.log(`Fused : ${relativePath}`);
                } catch (error) {
                    console.error(`Error while parsing JSON for ${slug}:`, error.message);
                }
            } else {
                console.log(`Ignored : ${relativePath}`);
            }

            fs.mkdirSync(path.dirname(outPath), { recursive: true });

            fs.writeFileSync(outPath, finalContent, 'utf8');
        }
    }
}

console.log("-- Started migration... --");

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

processDirectory(articlesDir);

console.log("-- Migration success ! --");