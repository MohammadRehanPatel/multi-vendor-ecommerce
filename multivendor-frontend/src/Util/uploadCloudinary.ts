
// export const uploadToCloudinary = async(pics:any)=>{
//     const cloud_name = "dwtxm2mbl"
//     const upload_preset="vendora"

//     if(pics){
//         const data = new FormData();
//         data.append("file",pics);
//         data.append("upload_preset",upload_preset)
//         data.append("cloud_name",cloud_name)

//         const res = await fetch(`https://api.cloudinary.com/v1_1/dwtxm2mbl/upload`,
//             {
//                 method:"POST",
//                 body:data
//             }
//         )
//         const fileData = await res.json()
//         return fileData.url;

//     }else{
//         console.log("Error : Pics Not Found!!");
//     }

// }

export const uploadToCloudinary = async (pics:any) => {
    // const cloud_name = "dwtxm2mbl";
    const cloud_name = "dqn7luieh";
    // dqn7luieh
    const upload_preset = "vendora";

    if (pics) {
        const data = new FormData();
        data.append("file", pics); // Ensure pics is a valid file object
        data.append("upload_preset", upload_preset);

        try {
            const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/upload`, {
                method: "POST",
                body: data
            });

            // Check if the response is ok (status in the range 200-299)
            if (!res.ok) {
                const errorData = await res.json();
                console.error("Upload failed:", errorData);
                throw new Error(`Upload failed: ${errorData.message}`);
            }

            const fileData = await res.json();
            return fileData.url; // Use secure_url for HTTPS

        } catch (error) {
            console.error("Error uploading to Cloudinary:", error);
        }
    } else {
        console.log("Error: Pics Not Found!!");
    }
}