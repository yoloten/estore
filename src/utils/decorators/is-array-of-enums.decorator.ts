import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsArrayOfEnums(entity: object, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsArrayOfEnums',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [entity],
      options: validationOptions,
      validator: {
        validate(value: string[], args: ValidationArguments) {
        
          if (!value) {
            return false
          }
          
          const notIn = []

          for (let i = 0; i < value.length; i++) {
              const el = value[i];
              
              if (!Object.values(entity).includes(el)) {
                  notIn.push(el)
              }
          }
          
          if (notIn.length) {
              return false
          }

          return true
        },
      },
    });
  };
}