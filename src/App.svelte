<script lang="ts">
import { fabric } from 'fabric';
import { onMount } from 'svelte';

let canvas:any,imagesData:any,mode:string='add'

let width:number,height:number,top:number,left:number

let objects:string[] = ['background','time','date','temperature','bpm']

onMount(()=>{
  canvas = new fabric.Canvas("canvas")
  imagesData = [
    {
      id:'background',
      src:'bg-blur.png',
      position:{
        id:'background',
        originX:'center',
        originY:'center',
        top: canvas.height /2,
        left: canvas.width /2,
      } 
    },
    {
      id:'time',
      src:'time.png',
      position:{
        id:'time',
        originX:'center',
        originY:'center',
        top: canvas.height /2,
        left: canvas.width /2,
      } 
    },
    {
      id:'date',
      src:'date.png',
      position:{
        id:'date',
        originX:'center',
        originY:'center',
        top: 205,
        left: 160,
      } 
    },
    {
      id:'temperature',
      src:'temperature.png',
      position:{
        id:'temperature',
        originX:'center',
        originY:'center',
        top: canvas.height /2 - 50,
        left: 180,
      } 
    },
    {
      id:'bpm',
      src:'bpm.png',
      position:{
        id:'bpm',
        originX:'center',
        originY:'center',
        top: 260,
        left: canvas.width /2,
      } 
    }
]

  //For monitoring selection of objects
  canvas.on("mouse:up", (opt) => {
    setFormValues()
  });
  
  //For zooming into objects on mouse wheel rotation 
  canvas.on("mouse:wheel", (opt) => {
    let delta = opt.e.deltaY;
    let zoom = canvas.getZoom();
    zoom *= 0.999 ** delta;
    if (zoom > 20) zoom = 20;
    if (zoom < 0.01) zoom = 0.01;
    canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
    opt.e.preventDefault();
    opt.e.stopPropagation();
  });
})

//For setting dimensionForm values
const setFormValues = () => {
  let activeObject = canvas.getActiveObject();
    if (activeObject) {
      width = Math.ceil(activeObject.width);
      height = Math.ceil(activeObject.height);
      top = Math.ceil(activeObject.top);
      left = Math.ceil(activeObject.left);
    } else {
      width = null;
      height = null;
      top = null;
      left = null;
    }
}

//For adding objects to canvas
const addImage = (name) => {
  let image = imagesData.find(item=> item.id=== name)

  fabric.Image.fromURL(image.src, (img)=>{
    img.set(image.position)
    canvas.add(img)
  });
}

//For editing object values and setting active object
const editObject = (name) => {
  let object
  canvas.forEachObject((obj)=>{
    if (obj.id === name) object = obj
  })

  if(object){
    canvas.setActiveObject(object)
    canvas.renderAll()
    setFormValues()   
  }  
}

//For finding object existence
const findObject = (name:string):boolean => {
  if (canvas){
    let object
    canvas.forEachObject((obj)=>{
      if (obj.id === name) object = obj
    })
    if (object){
      return true
    }
  }
  return false
}

//For binding input values to active object
const changeValue = (params) => {
  switch (params) {
    case "width":
      canvas.getActiveObject().set("width", Number(width));
      break;
    case "height":
      canvas.getActiveObject().set("height", Number(height));
      break;
    case "top":
      canvas.getActiveObject().set("top", Number(top));
      break;
    case "left":
      canvas.getActiveObject().set("left", Number(left));
      break;
    default:
      break;
  }
  canvas.requestRenderAll();
};
</script>

<h1 class="text-6xl text-center font-semibold uppercase mt-5">watch face tool poc</h1>

<div style="background-image:url('watch-face.png')" class="h-[364px] w-[327px] bg-cover mx-auto mt-10 pt-10 pl-9">
  <canvas id="canvas" width="240" height="280"/>
</div>

<section>
  <div class="mt-10 border border-dashed rounded-xl p-5">  
    <div class="flex gap-5 justify-center">
      <button class="px-4 py-2 rounded-xl text-lg font-medium uppercase border border-transparent {mode==='add'? 'bg-white text-black' : ''} hover:border-white" on:click={()=>mode ='add'}>
        add
      </button>
      <div class="w-[2px] bg-white"/>
      <button class="px-4 py-2 rounded-xl text-lg font-medium uppercase border border-transparent {mode==='edit'? 'bg-white text-black' : ''} hover:border-white" on:click={()=>mode ='edit'}>
        edit
      </button>
    </div>
    <div class="flex gap-5 mt-7 justify-center flex-wrap">
      {#each objects as object (object)}
        {#if mode === 'add'}  
          <button class="px-4 py-2 rounded-xl text-lg font-medium capitalize border border-transparent hover:border-white {findObject(object)? 'bg-neutral-400':''} focus:bg-neutral-400" on:click|once={()=>{objects=objects;addImage(object)}} disabled={findObject(object)}>
            {object}
          </button>
        {:else if mode === 'edit'}
          <button class="px-4 py-2 rounded-xl border text-lg font-medium capitalize hover:bg-neutral-400 disabled:opacity-20 disabled:border-none disabled:hover:bg-transparent" on:click={()=>editObject(object)} disabled={!findObject(object)}>
            {object}
          </button>
        {/if}
      {/each}
    </div>
  </div>
  {#if mode === 'edit'}  
    <!-- Form for viewing/editing values -->
    <form id="dimensionForm" class="mt-10 flex gap-3 h-max flex-wrap border border-dashed rounded-xl p-5 justify-center">
      <div class="flex flex-col gap-2">
        <label for={"width"} class="capitalize"> width: </label>
        <input
          type="number"
          name={"width"}
          id={"width"}
          class="border rounded-lg p-2 bg-transparent"
          bind:value={width}
          on:input={()=>changeValue("width")}
        />
      </div>
      <div class="flex flex-col gap-2">
        <label for="height" class="capitalize"> height: </label>
        <input
          type="number"
          name="height"
          id="height"
          class="border rounded-lg p-2 bg-transparent"
          bind:value={height}
          on:input={()=>changeValue("height")}
        />
      </div>
      <div class="flex flex-col gap-2">
        <label for="top" class="capitalize"> top: </label>
        <input
          type="number"
          name="top"
          id="top"
          class="border rounded-lg p-2 bg-transparent"
          bind:value={top}
          on:input={()=>changeValue("top")}
        />
      </div>
      <div class="flex flex-col gap-2">
        <label for="left" class="capitalize"> left: </label>
        <input
          type="number"
          name="left"
          id="left"
          class="border rounded-lg p-2 bg-transparent"
          bind:value={left}
          on:input={()=>changeValue("left")}
        />
      </div>
    </form>
  {/if}
</section>