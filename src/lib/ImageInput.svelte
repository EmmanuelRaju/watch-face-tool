<script>
	let  avatar, fileinput;
	
	const onFileSelected =(e)=>{
    console.log("target",e.target.files);
  let image = e.target.files[0];
  let reader = new FileReader();
  reader.readAsDataURL(image);
  reader.onload = e => {
    console.log("reader",e.target);
    avatar = e.target.result
  };
}
	
</script>
<div>
	<h1>Upload Image</h1>  
  {#if avatar}
    <img class="avatar" src="{avatar}" alt="d" />
  {/if}
  <input type="file" accept=".jpg, .jpeg, .png" on:change={(e)=>onFileSelected(e)} bind:this={fileinput} >
</div>
