const fs = require('fs');
const path = require('path');
const { BearFactory } = require('../bears');
const { log } = require('console');
const { BEAR_GATEWAY_IPFS } = require('../constants');
require('dotenv').config()

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

async function checkJsonData(filesInTheFolder){
    console.log('checking json...');
    let i=1
    for (let file of filesInTheFolder) {
        let result=true
        let content = await fs.readFileSync(file, 'utf-8');
        content = JSON.parse(content)
        let tokenId=content.tokenId
        let id=content.attributes.element.toString()+content.attributes.fur.toString()+content.attributes.eye.toString()+content.attributes.item.toString()

        if(parseInt(tokenId)!=parseInt(id)){
            console.log("Wrong info:",tokenId);
            console.log("tokenId:",tokenId);
            console.log("id:",id);
            result=false

        }
        if(!content.image.includes(tokenId.toString())){
            console.log("Wrong info:",tokenId);
            console.log("image:",content.image);
            result=false
        }
        if(!content.assets.includes(tokenId.toString())){
            console.log("Wrong info:",tokenId);
            console.log("assets:",content.assets);
            result=false
        }
        if(result){
            console.log(tokenId,'is Oke --',i);
            i++
            continue
        }
        console.log(tokenId,'is not Oke');
    }
    console.log('done');
    
}
async function mappingJsonData(filesInTheFolder){
    let result={}
    for (let file of filesInTheFolder) {
        let content = await fs.readFileSync(file, 'utf-8');
        content = JSON.parse(content)
        let tokenId=content.tokenId
        let id=content.attributes.element.toString()+content.attributes.fur.toString()+content.attributes.eye.toString()+content.attributes.item.toString()

        result[tokenId]=content
    }

    return result
}
async function checkSpriteAndImage(filesInTheFolder_old,filesInTheFolder_old_image,key){
    let i=1
    for (let file of filesInTheFolder_old) {
        let content = await fs.readFileSync(file, 'utf-8');
        content = JSON.parse(content)
        let tokenId=content.tokenId
        // content.description=new_mapping_json[tokenId]?.description||''
        // await writeFile(file, JSON.stringify(content))
        let isInclude=false
        for(let path of filesInTheFolder_old_image){
            if(path.includes(tokenId) && path.includes(key) &&path.includes('.png'))
                {
                    isInclude=true
                }
        }
        if(isInclude){
            console.log(tokenId,'is Oke --',i);
            i++
            continue
        }
        console.log(tokenId,'is not Oke');
    }
    console.log('done');
}
async function checkField(filesInTheFolder_old,field,condition=()=>{}){
    let i=1
    for (let file of filesInTheFolder_old) {
        let content = await fs.readFileSync(file, 'utf-8');
        content = JSON.parse(content)
        let tokenId=content.tokenId
        // content.description=new_mapping_json[tokenId]?.description||''
        // await writeFile(file, JSON.stringify(content))
        if(condition(content.description)){
            console.log(tokenId,'is Oke --',i);
            i++
            continue
        }
        console.log(tokenId,'is not Oke');
        
    }
    console.log('done');
}

async function run() {
    const gateway = `${BEAR_GATEWAY_IPFS}/QmVZbphhJuVFpzEMY87ZHfKCXECcu1oWi56bKrEW7kbAK4`

    const folderPath_old = 'D:\\DOAN\\nftData_Reproduce_luc\\json'
    const filesInTheFolder_old = getFiles(folderPath_old)

    const folderPath_old_image = 'D:\\DOAN\\nftData_Reproduce_luc\\images';
    const filesInTheFolder_old_image = getFiles(folderPath_old_image)

    
    // // checking data
    // console.log('json');
    // console.log(filesInTheFolder_old.length);
    // console.log('images');
    // console.log(filesInTheFolder_old_image.length);
    // console.log('New');
    // await checkJsonData(filesInTheFolder_old)
    // console.log('checking sprites');
    // await checkSpriteAndImage(filesInTheFolder_old,filesInTheFolder_old_image,'sprites')
    // console.log('checking bear');
    // await checkSpriteAndImage(filesInTheFolder_old,filesInTheFolder_old_image,'bear')
    // console.log('checking field Description');
    // await checkField(filesInTheFolder_old,'description',(item)=>item!='')
    // console.log('checking field ATK');
    // await checkField(filesInTheFolder_old,'atk',(item)=>item)
    // console.log('checking field HP');
    // await checkField(filesInTheFolder_old,'hp',(item)=>item)
    // console.log('checking field title');
    // await checkField(filesInTheFolder_old,'title',(item)=>item!='')

    //mapping data
    // let old_mapping_json= await mappingJsonData(filesInTheFolder_old)
    // let new_mapping_json=await mappingJsonData(filesInTheFolder_new)
    

    //write json
    for (let file of filesInTheFolder_old) {
        let content = await fs.readFileSync(file, 'utf8');
        content = JSON.parse(content)
        let id = content.tokenId
        content.image = `${gateway}/bear_${id}.png`
        content.assets = `${gateway}/sprites_${id}.png`
        await writeFile(file, JSON.stringify(content))
        if (id=='1111') {
            let client_gateway = process.env.CLIENT_IPFS_ID || null
            let public_gateway = `ipfs.io`
            console.log('image',content.image.replace(public_gateway, client_gateway));
            console.log('assets',content.assets.replace(public_gateway, client_gateway));
        }
    }
    console.log('write data done');
    return
}

run()
// function getLevel(exp) {
//     let constant = 100
//     let level = 0
//     while (exp > 0) {
//         let increase_level_exp_require = (level + 1) * constant
//         let remaining_exp = exp - increase_level_exp_require
//         let increase_level = 0
//         if (remaining_exp > 0) {
//             increase_level = 1
//         } else {
//             increase_level= (remaining_exp + increase_level_exp_require) / increase_level_exp_require
//         }
//         level += increase_level
//         exp=remaining_exp
//     }
//     return level
// }

// console.log(getLevel(exp));