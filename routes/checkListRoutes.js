const router = require('express').Router();
const CheckList = require('../models/checkListModel');

// /api/checklist/
// get all checklists
router.get('/', async (req, res) => {
    console.log("GET");
    const checkLists = await CheckList.find({}, (err, checkList)=> {
        if (err) return res.json({msg: 'failed', err});
    });

    return res.json(checkLists);
});

// /api/checklist/add
// adds a checklist
router.post('/add', (req, res) => {
    const checkList = new CheckList({...req.body});
    checkList.save((err, checkList) => {
        if (err) return res.json({msg: 'failed', err});
        return res.json({msg:'success', checkList});
    });
});

// /api/checklist/delete
// delete a specific category
router.delete('/delete/:category', async (req, res) => {
    const category = req.params.category;
    // check that category exists
    const checkList = await CheckList.findOne({category});
    if (!checkList) {
        return res.json({msg: 'failed', err: "Unable to find checklist"});
    }

    CheckList.deleteMany({category}, (err, checkList) => {
        if (err) return res.json({msg: 'failed', err});
        return res.json({msg:'success', checkList});
    });
});

// /api/checklist/edit
router.put('/edit', async (req, res) => {
    const category = req.body.category;

    // check that category exists
    const checkList = await CheckList.find({category});
    if (!checkList) {
        return res.json({msg: 'failed', err: "Unable to find checklist"});
    }

    const updatedCheckList = {...req.body};
    CheckList.findOneAndUpdate({category}, updatedCheckList, (err) => {
        if (err) return res.json({msg: 'failed', err});
        return res.json({msg:'success', updatedCheckList});
    });

});

module.exports = router;