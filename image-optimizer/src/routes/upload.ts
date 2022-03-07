import fs from "fs";
import { compressFolder } from "config";
import { FastifyReply, FastifyRequest } from "fastify";
import archiver from "archiver";
import { convert } from "lib/image-converter";
import { arrayBufferToString } from "lib";
import bufferToString from "btoa";

const uploadRoute = async (request: FastifyRequest, reply: FastifyReply) => {
  // create an files variable and assign the files from the request
  const files = request.files ? request.files : undefined;
  // the counter variable determines the name of the images: 0,1,2,3,4 and so on
  let counter = 1;
  // if files exists
  if (files) {
    // check if files.fileLoad is an array
    // this is because if express-fileupload only gets one file it doesn't create an array of objects, it just adds the object. So instead of always doing {[files]} it does {file} when it's only one file
    if (Array.isArray(files.fileLoad)) {
      // loop through the  to get the data of each image
      for (let image of files.fileLoad) {
        // convert the images
        await convert(
          image.data,
          __dirname +
            compressFolder +
            "/" +
            counter +
            "." +
            request.body.output,
          {
            format: request.body.output,
            quality: request.body.quality,
            width: request.body.width,
            height: request.body.height,
          }
        );
        // increase the counter
        counter++;
      }
      // export the images inside a zip file
      // delete the created images and zip after exporting
      await exportFiles();
    }
    // if files.fileLoad is NOT an array
    else {
      // convert the file
      await convert(
        files.fileLoad.data,
        __dirname + compressFolder + "/" + counter + "." + request.body.output,
        {
          format: request.body.output,
          quality: request.body.quality,
          width: request.body.width,
          height: request.body.height,
        }
      );
      // export the images inside a zip file
      // delete the created images and zip after exporting
      await exportFiles();
    }
  }

  // export the files
  async function exportFiles() {
    // set the directory to which write the zip to
    const output = fs.createWriteStream(__dirname + "/images.zip");
    // creates a zip file
    const archive = archiver("zip", {
      // set the compression level
      zlib: { level: 9 },
    });
    // stream the archive data to the output file
    archive.pipe(output);
    // get the images from the compressFolder
    archive.directory(__dirname + compressFolder + "/", false);
    // finalize the archive (ie we are done appending files but streams have to finish yet)
    await archive.finalize();
    // finish is always executed before close independently of where they were declared
    // on finish
    output.on("finish", function () {
      // send a response with the zip
      fs.readFile(__dirname + "/images.zip", (err, data) => {
        if (err) throw err;
        return reply.status(200).send({
          data:
            "data:application/zip;base64," +
            bufferToString(arrayBufferToString(data)),
        });
      });
    });
    // on close
    output.on("close", function () {
      //remove the images from compressFolder
      fs.promises.rmdir(__dirname + compressFolder, { recursive: true });
      // remove the zip file
      fs.promises.rm(__dirname + "/images.zip");
    });
  }
};

export default uploadRoute;
