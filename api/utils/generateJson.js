const fs = require('fs');
const path = require('path');
const { BearFactory } = require('../bears');
const { log } = require('console');
const { BEAR_GATEWAY_IPFS } = require('../constants');

async function isExists(path) {
    try {
        await fs.access(path);
        return true;
    } catch {
        return false;
    }
};

async function writeFile(filePath, data) {
    try {
        const dirname = path.dirname(filePath);
        const exist = await isExists(dirname);
        if (!exist) {
            await fs.mkdirSync(dirname, { recursive: true });
        }

        await fs.writeFileSync(filePath, data, 'utf8');
    } catch (err) {
        throw new Error(err);
    }
}



function getRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
}

async function getRandomName() {
    try {
        let firstNamePool = await fs.readFileSync(path.join(__dirname, 'fistname.json'), 'utf8')
        let lastNamePool = await fs.readFileSync(path.join(__dirname, 'lastname.json'), 'utf8')

        firstNamePool = JSON.parse(firstNamePool)
        lastNamePool = JSON.parse(lastNamePool)

        const lastName = firstNamePool[getRandomIndex(lastNamePool)];
        const firstName = lastNamePool[getRandomIndex(firstNamePool)];

        return `${lastName} ${firstName}`;
    } catch (error) {
        console.log(error);
    }
}

async function generateData() {
    //config
    const DEST_FOLDER_NAME = `${__dirname}/jsonNFT`
    const bearFactory = new BearFactory()
    let pool = bearFactory.getPoolBear()

    const data = await Promise.all(pool.map(async bear => {
        const name = await getRandomName();
        const title = "Bear";
        const id = bear.getId();
        const type = "NFT";
        const description = "Bear Description";

        const attributes = {
            "element": bear.__element,
            "fur": bear.__fur,
            "eye": bear.__eye,
            "item": bear.__item,
        };
        const image = `bear_${id}.jpg`;
        const assets = `sprites_${id}.png`;

        return {
            title,
            type,
            tokenId: id,
            name,
            description,
            attributes,
            image,
            assets
        };
    }));

    await Promise.all(data.map(async item => {
        let { tokenId } = item
        let filePath = `${DEST_FOLDER_NAME}/${tokenId}/${tokenId}.json`

        await writeFile(filePath, JSON.stringify(item))

    }))
}
// generateData()

function getFiles(dir, files = []) {
    // Get an array of all files and directories in the passed directory using fs.readdirSync
    const fileList = fs.readdirSync(dir)
        // Create the full path of the file/directory by concatenating the passed directory and file/directory name
    for (const file of fileList) {
        const name = `${dir}/${file}`
            // Check if the current file/directory is a directory using fs.statSync
        if (fs.statSync(name).isDirectory()) {
            // If it is a directory, recursively call the getFiles function with the directory path and the files array
            getFiles(name, files)
        } else {
            // If it is a file, push the full path to the files array
            files.push(name)
        }
    }
    return files
}
async function run() {
    const gateway = `${BEAR_GATEWAY_IPFS}/QmPcvN9XUUPFuu8HG5uC8jHEiWWk5xa8sLUfaqHnmyVHf5`
    const folderPath = 'C:\\Users\\Acer\\Desktop\\DOAN\\nftData\\json';
    const filesInTheFolder = getFiles(folderPath)
    for (let file of filesInTheFolder) {
        let atkMapping = {
            1: 50,
            2: 40,
            3: 30,
            4: 30,
            5: 25,
            6: 45,
        }
        let hpMapping = {
            1: 100,
            2: 120,
            3: 150,
            4: 150,
            5: 200,
            6: 100,
        }
        let scaleMapping = {
            1: 14,
            2: 12,
            3: 15,
            4: 15,
            5: 10,
            6: 18,
        }
        let content = await fs.readFileSync(file, 'utf8');
        content = JSON.parse(content)
        let id = content.tokenId
        const elementId = id[0]
        content.image = `${gateway}/bear_${id}.png`
        content.assets = `${gateway}/sprites_${id}.png`
        content.atk = atkMapping[elementId]
        content.hp = hpMapping[elementId]
        content.scale_level = scaleMapping[elementId]
        await writeFile(file, JSON.stringify(content))
    }
}

// run()
function getLevel(exp) {
    let constant = 100
    let level = 0
    while (exp > 0) {
        let increase_level_exp_require = (level + 1) * constant
        let remaining_exp = exp - increase_level_exp_require
        let increase_level = 0
        if (remaining_exp > 0) {
            increase_level = 1
        } else {
            increase_level= (remaining_exp + increase_level_exp_require) / increase_level_exp_require
        }
        level += increase_level
        exp=remaining_exp
    }
    return level
}
let exp =10000

console.log(getLevel(exp));