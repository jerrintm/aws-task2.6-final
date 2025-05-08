This project was the final task for AWS.
Here wrote code to upload files through web browser to AWS S3 bucket, and the file needs to be resized and placed in a separate bucket.
The web browser code(UI) was coded in html(file - upload.html)
The server code(file server.js) was written in node.js. This file was deployed to the EC2 instance and code ran using command 'node server.js'.
The html code is accessed locally from where the file is present on the local machine, though the code reaches out to the AWS EC2 instance.
Once the file uploads, the lamba function writes the file to an S3 bucket, in the directory 'original-images'. This file then gets resized and added to the 'resized-images' directory.