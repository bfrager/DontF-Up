//1) local storage in case of refresh:
var localStorageKey = 'drawing'
    if (localStorage.getItem(localStorageKey)) {
      $canvas.loadSnapshot(JSON.parse(localStorage.getItem(localStorageKey)));
    }
    $canvas.on('drawingChange', function() {
      localStorage.setItem(localStorageKey, JSON.stringify($canvas.getSnapshot()));
    });


//2) export to PNG

<form class="controls export">
  <input type="submit" data-action="export-as-png" value="Export as PNG">
</form>

<script>
  $(document).ready(function() {
    var lc = LC.init(document.getElementsByClassName('literally')[0]);
    $('.controls.export [data-action=export-as-png]').click(function(e) {
      e.preventDefault();
      window.open(lc.getImage().toDataURL());
    });
  });
</script>


//3) imgur upload:

<form class="imgur-submit">
    <input type="submit" data-action="upload-to-imgur" value="Upload to Imgur">
</form>

<script>
$('[data-action=upload-to-imgur]').click(function(e) {
  e.preventDefault();
$('.imgur-submit').html('Uploading...')
// this is all standard Imgur API; only $canvas-specific thing is the image
// data argument;
$.ajax({
  url: 'https://api.imgur.com/3/image',
  type: 'POST',
  headers: {
    // Your application gets an imgurClientId from Imgur
    Authorization: 'Client-ID ' + imgurClientId,
    Accept: 'application/json'
  },
  data: {
    // convert the image data to base64
    image:  $canvas.canvasForExport().toDataURL().split(',')[1],
    type: 'base64'
  },
  success: function(result) {
    var url = 'https://imgur.com/gallery/' + result.data.id;
    $('.imgur-submit').html("<a href='" + url + "'>" + url + "</a>");
  },
});
</script>
