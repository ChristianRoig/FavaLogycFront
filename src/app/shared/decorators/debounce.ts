import { debounce } from 'lodash';

/**
 * Debounce a method
 * @param ms (opcional) = Milisegundos. Default 1000ms ( 1 segundo )
 */
export function Debounce(ms?) {

    let milisegundos = ms | 1000;

    return function(target: any, key: any, descriptor: any) {

        const oldFunction = descriptor.value
        const newFunction = debounce(oldFunction, milisegundos)

        descriptor.value = function() {
            return newFunction.apply(this, arguments)
        }
    }
}

// export function Debounce (ms){


//     console.log('milisegundos:', ms);
    
//     return function (target: Object, propertyKey: string, descriptor: any) {
//         console.log('Clase: ', target.constructor.prototype);
//         console.log('Método: ', propertyKey);
//         console.log('Property Descriptor: ', descriptor);

//         const oldFunction = descriptor.value;

//         descriptor.value = function() {

//             oldFunction();
//             console.log('Decorador buscar');
            
//         }
//     }
// }

