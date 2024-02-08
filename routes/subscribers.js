import express from "express";
import subscriberModel from '../models/subscriber.js'

const router = express.Router()

//get all
router.get('/', async (req, res)=>{
    try{
        const subscribers = await subscriberModel.find()
        res.json(subscribers)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

//get one
router.get('/:id', getSubscriber, (req, res)=>{
    //req.params.id
    res.send(req.subscriber)
})

//create one
router.post('/', async (req, res)=>{
    const subscriber = new subscriberModel({
        name: req.body.name,
        subscriberToChannel: req.body.subscriberToChannel,
    })

    try{
        const newSubscriber = await subscriber.save();
        res.status(201).json(newSubscriber)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

//update one
router.patch('/:id', getSubscriber, async (req, res) => {
    if (req.subscriber) {
        if (req.body.name != null) {
            req.subscriber.name = req.body.name;
        }
        if (req.body.subscriberToChannel != null) {
            req.subscriber.subscriberToChannel = req.body.subscriberToChannel;
        }

        try {
            const updatedSubscriber = await req.subscriber.save();
            res.json(updatedSubscriber);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    } else {
        res.status(404).json({ message: 'Subscriber not found' });
    }
});


//delete one
router.delete('/:id', getSubscriber, async (req, res)=>{
    try{
        await subscriberModel.findByIdAndDelete(req.params.id)
        res.json({message: 'Deleted subscriber'})
    } catch(err){
        res.status(500).json({ message: err.message })
    }
})

async function getSubscriber(req, res, next){
    let subscriber = undefined
    try{
        subscriber = await subscriberModel.findById(req.params.id)
        if(subscriber==null) {
            console.log("Got null")
            return res.status(404).json({message: "Cannot find subscriber"})
        }
    } catch(err){
        res.status(500).json({message: err.message})
    }

    req.subscriber = subscriber
    next()
}


export default router;