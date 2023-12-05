import { Event, Round } from "../models/index.js";

async function updateImage() {
    try {
        const listEvents = await Event.find({})
        console.log(listEvents.length)
        for (let i = 0; i < listEvents.length; i++) {
            const idEvent = listEvents[i]._id
            console.log(idEvent)
            const htShortName = listEvents[i].homeTeam.shortName
            const atShortName = listEvents[i].awayTeam.shortName
            let htImage = "/bpimages/" + htShortName.replace(" ","") + ".png"
            let atImage = "/bpimages/" + atShortName.replace(" ","") + ".png"
            console.log(htImage, atImage)
            await Event.updateOne(
                { _id: idEvent},
                {
                    $set: {
                        'homeTeam.image': htImage,
                        'awayTeam.image': atImage
                    }
                }
            )
        }
    } catch (error) {
        console.log(error)
    }
}

export default updateImage