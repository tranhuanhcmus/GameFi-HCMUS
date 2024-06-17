const fs = require('fs');
const path = require('path');
const { BearFactory } = require('../bears');

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
		let filePath=`${DEST_FOLDER_NAME}/${tokenId}/${tokenId}.json`
		
		await writeFile(filePath,JSON.stringify(item))

    }))
}
generateData()
console.log(
    new BearFactory().getPoolBear().length
);