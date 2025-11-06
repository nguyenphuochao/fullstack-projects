import subjectModel from "../models/subjectModel.js";


// Add subject
const addSubject = async (req, res) => {
    try {
        const { name, number_of_credits } = req.body
        await subjectModel.create({
            name: name,
            numberOfCredits: number_of_credits,
        });
        res.status(201).json({ success: true, message: "Subject created success" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error" })
    }
}

// Get list subject
const listSubject = async (req, res) => {
    try {
        let searchQuery = subjectModel.find({});
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Search params
        if (Object.hasOwn(req.query, 'search')) {
            searchQuery.find({
                name: { $regex: req.query.search, $options: 'i' }
            })
        }

        const totalCount = await subjectModel.countDocuments(searchQuery);
        const totalPages = Math.ceil(await subjectModel.countDocuments(searchQuery) / limit);
        const pagination = { page, totalPages };

        searchQuery.skip(skip).limit(limit);

        const subjects = await subjectModel.find(searchQuery).sort({ createdAt: 'desc' });
        res.status(200).json({ success: true, data: subjects, totalCount, pagination });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error" })
    }
}

export { addSubject, listSubject }
