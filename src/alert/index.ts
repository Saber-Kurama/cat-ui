import Alert from './alert';
import { concat } from 'lodash';
import './style';

export default () => {
  console.log('alert-----');
  Alert();
  console.log(concat(2, [3], [4]))
  let obj = null;
  const saber = obj?? {'saber': 'sa'}
  // const a:any  = () => {
  //   return {}
  // }
  // a?.saber();
  console.log(saber)
}