const express = require("express");
const Complaint = require("../models/complaint");
const upload = require("../middleware/upload");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");


const router = express.Router();

// Create a new complaint
router.post(
    "/create",
    authMiddleware,
    roleMiddleware("student"),
    upload.single("photo"),
    async (req, res) => {
        try {
            // Get complaint details from frontend
            const {
                title,
                category,
                priority,
                location,
                description
            } = req.body;

            const photoPath = req.file ? req.file.path : "";

            // Validate required fields
            if (!title || !category || !location || !description) {
                return res.status(400).json({
                    message: "Please fill in all required fields."
                });
            }

            // Create a new complaint
            const complaint = await Complaint.create({
                title,
                category,
                priority,
                location,
                description,
                photo: photoPath,
                student: req.user.id
            });

            // Send success response
            return res.status(201).json({
                message: "Complaint submitted successfully",
                complaint
            });

        } catch (error) {
            console.error("Complaint creation error:", error);

            // Handle schema validation errors
            if (error.name === "ValidationError") {
                return res.status(400).json({
                    message: error.message
                });
            }

            return res.status(500).json({
                message: "Server error"
            });
        }
    }
);

// Get complaints submitted by the logged-in student
router.get(
    "/my-complaints",
    authMiddleware,
    roleMiddleware("student"),
    async (req, res) => {
        try {
            const complaints = await Complaint.find({
                student: req.user.id
            }).sort({ createdAt: -1 });

            return res.status(200).json({
                complaints
            });
        } catch (error) {
            console.error("Fetching complaints error:", error);

            return res.status(500).json({
                message: "Server error"
            });
        }
    }
);


// Get all complaints - Admin only
router.get(
    "/all",
    authMiddleware,
    roleMiddleware("admin"),
    async (req, res) => {
        try {
            const complaints = await Complaint.find()
                .populate("student", "name email")        //gives basic information of student instead of id
                .sort({ createdAt: -1 });

            return res.status(200).json({
                complaints
            });
        } catch (error) {
            console.error("Fetching all complaints error:", error);

            return res.status(500).json({
                message: "Server error"
            });
        }
    }
);


// Get one complaint based on id
router.get(
    "/:id",
    authMiddleware,
    roleMiddleware("admin"),
    async (req, res) => {
        try {
            const complaint = await Complaint.findById(req.params.id).populate(
                "student",
                "name email"
            );

            if (!complaint) {
                return res.status(404).json({
                    message: "Complaint not found",
                });
            }

            res.status(200).json({
                complaint
            });
        } catch (error) {
            console.error("Fetch complaint error:", error);

            if (error.name === "CastError") {
                return res.status(400).json({
                    message: "Invalid complaint ID",
                });
            }
            res.status(500).json({
                message: "Server error"
            });
        }
    }
)



// Update complaint status - Admin only
router.put(
    "/update-status/:id",
    authMiddleware,
    roleMiddleware("admin"),
    async (req, res) => {
        try {
            const { status } = req.body;
            const complaintId = req.params.id;

            // Check valid status
            const allowedStatuses = [
                "Pending",
                "In Progress",
                "Resolved"
            ];

            if (!allowedStatuses.includes(status)) {
                return res.status(400).json({
                    message: "Invalid complaint status."
                });
            }

            // Find and update complaint
            const complaint = await Complaint.findByIdAndUpdate(
                complaintId,
                { status },
                { new: true, runValidators: true }
            );

            if (!complaint) {
                return res.status(404).json({
                    message: "Complaint not found."
                });
            }

            return res.status(200).json({
                message: "Complaint status updated successfully",
                complaint
            });

        } catch (error) {
            console.error("Status update error:", error);

            if (error.name === "CastError") {
                return res.status(400).json({
                    message: "Invalid complaint ID."
                });
            }

            return res.status(500).json({
                message: "Server error"
            });
        }
    }
);


module.exports = router;
