export function track(target: object, key: unknown) {
  console.log('track: 收集依赖'); 
  console.log('watch2');
  
}

export function trigger(target: object, key: unknown, newValue: unknown) {
  console.log('trigger：触发依赖');
  
}
