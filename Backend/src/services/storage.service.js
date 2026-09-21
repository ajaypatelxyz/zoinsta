const ImageKit = require('@imagekit/nodejs')

const imageKit = new ImageKit({
    privateKey: process.env.IMAGEKIT_URL
})

const uploadFile = async(buffer) => {

    const result = await imageKit.files.upload({
        file: buffer.toString("base64"),
        fileName: "video.mp4"
    })

    return result

}

module.exports = {
    uploadFile
}