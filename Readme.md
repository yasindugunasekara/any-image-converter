# Image Format Converter Web Application

This is a web application built with **React** (frontend) and **Flask** (backend) that allows users to upload images, convert them to a different format, and download the converted images as a **ZIP file**.

## Features
- **Multiple Image Uploads**: Upload multiple images at once.
- **Convert Images to Different Formats**: Choose from formats like JPEG, PNG, BMP, GIF, TIFF, or WEBP.
- **Download as ZIP**: After converting, download all the images as a single ZIP file.
- **Modern UI**: Built with a clean, dark theme and modern UI components.

## Tech Stack
- **Frontend**: React, Axios
- **Backend**: Flask, PIL (Python Imaging Library)
- **Styling**: CSS (Custom dark theme)
- **File Storage**: Local storage (for uploaded files and converted images)

## Prerequisites

Make sure you have the following installed:

- **Node.js** (v12 or later) - for running the React frontend
- **Python** (v3.6 or later) - for running the Flask backend
- **PIP** - for installing Python dependencies
- **Flask**, **Pillow**, and **Flask-CORS** - for the backend

## Setup Instructions

### 1. Clone the repository
Clone this repo to your local machine using:

```bash
git clone https://github.com/yourusername/image-format-converter.git
cd image-format-converter
