const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://example.com';
const PAGES = [
    '/members-list.html',
    '/members-list-2.html',
    '/members-list-3.html',
    '/members-list-4.html'
];

const IMAGES_DIR = path.join(__dirname, 'images');

if (!fs.existsSync(IMAGES_DIR)) {
    fs.mkdirSync(IMAGES_DIR);
}

async function downloadImage(url, filename) {
    try {
        const response = await axios({
            url,
            method: 'GET',
            responseType: 'stream',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
            }
        });
        
        const writer = fs.createWriteStream(path.join(IMAGES_DIR, filename));
        response.data.pipe(writer);
        
        return new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });
    } catch (error) {
        console.error(`Error downloading image ${url}: ${error.message}`);
    }
}

async function scrape() {
    let allMembers = [];

    for (const pageUrl of PAGES) {
        const fullUrl = `${BASE_URL}${pageUrl}`;
        console.log(`Scraping ${fullUrl}...`);
        
        try {
            const response = await axios.get(fullUrl, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
                }
            });
            const html = response.data;
            const $ = cheerio.load(html);

            const members = $('.team-two__single');
            
            for (let i = 0; i < members.length; i++) {
                const el = members[i];
                const name = $(el).find('.team-two__name').text().trim();
                const designation = $(el).find('.team-one__sub-title').text().trim();
                const imgSrc = $(el).find('.team-two__img img').attr('src');
                
                if (!name && !designation) continue;

                let localImageName = null;
                if (imgSrc) {
                    // Get filename from the url
                    const parts = imgSrc.split('/');
                    const filename = parts[parts.length - 1];
                    const cleanFilename = filename.split('?')[0]; // remove query params if any
                    localImageName = cleanFilename;
                    
                    const imgUrl = `${BASE_URL}/${imgSrc}`;
                    console.log(`Downloading image for ${name}: ${imgUrl}`);
                    await downloadImage(imgUrl, cleanFilename);
                }

                allMembers.push({
                    name,
                    designation,
                    photo: localImageName,
                    originalPhotoUrl: imgSrc ? `${BASE_URL}/${imgSrc}` : null
                });
            }
        } catch (error) {
            console.error(`Error scraping ${fullUrl}: ${error.message}`);
        }
    }

    fs.writeFileSync(path.join(__dirname, 'members.json'), JSON.stringify(allMembers, null, 2));
    
    // Also save as CSV for easy viewing
    const csvHeader = 'Name,Designation,PhotoFile\n';
    const csvContent = allMembers.map(m => `"${m.name}","${m.designation}","${m.photo}"`).join('\n');
    fs.writeFileSync(path.join(__dirname, 'members.csv'), csvHeader + csvContent);
    
    console.log(`Successfully extracted ${allMembers.length} members.`);
}

scrape();
