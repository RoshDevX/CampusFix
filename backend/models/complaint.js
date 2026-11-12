
const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
    {
        // Complaint title
        title: {
            type: String,
            required: true,
            trim: true,
        },

        // Complaint category
        category: {
            type: String,
            required: true,
            enum: [
                "Electrical",
                "Plumbing",
                "Internet",
                "Cleaning",
                "Furniture",
                "Other",
            ],
        },

        // Complaint priority
        priority: {
            type: String,
            enum: ["Low", "Medium", "High", "Urgent"],
            default: "Medium",
        },

        // Campus location
        location: {
            type: String,
            required: true,
            trim: true,
        },

        // Detailed complaint description
        description: {
            type: String,
            required: true,
            maxlength: 500,
        },

        // Photo upload
        photo: {
            type: String,
            default: "",
        },

        // Student who submitted the complaint
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        // Complaint status
        status: {
            type: String,
            enum: ["Pending", "In Progress", "Resolved"],
            default: "Pending",
        },
    },
    {
        timestamps: true,
    }
);

const Complaint = mongoose.model("Complaint", complaintSchema);

module.exports = Complaint;
