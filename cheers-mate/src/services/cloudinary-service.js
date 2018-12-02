const CLOUD_NAME = 'cheers-mate';

const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
const UPLOAD_PRESET = 'cheers-mate-guest';
// on submit call to this function
function uploadImg(elForm, ev) {
    ev.preventDefault();
   
    // A function to be called if request succeeds
    function onSuccess(res) {
        console.log('uploadedImg', res);
        console.log('uploadedImg', res.url);
    }

    doUploadImg(elForm, onSuccess);
}

function doUploadImg(elForm, onSuccess) {
    var UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
    var formData = new FormData();
    formData.append('file', elForm[0].files[0])
    formData.append('upload_preset', UPLOAD_PRESET);

    fetch(UPLOAD_URL, {
        method: 'POST',
        body: formData
    })
    .then(function (response) {
        return response.json()
    })
    .then(onSuccess)
    .catch(function (error) {
        console.error(error)
    })
}



// HTML EXAMPLE
/*
  <form class="publish-form" action="" method="POST" enctype="multipart/form-data" onsubmit="uploadImg(this, event)">
    <div>
      <input type="file" name="img" />
    </div>
    <div>
      <button type="submit" class="btn">Submit</button>
    </div>
  </form>
*/