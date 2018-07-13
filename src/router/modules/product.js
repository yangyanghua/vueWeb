import product from '@/modules/product/index.vue';
import classification from '@/modules/product/components/classification/index.vue';


export default [{
  path: 'product',
  component: product,
  redirect: '/product/classification',  
  children:[
  		{
  			path:'classification',
  			component:classification
  		},		
  ]
  
}];
