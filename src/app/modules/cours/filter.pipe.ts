import { Pipe, PipeTransform } from '@angular/core';
import { ModuleTeardownOptions } from '@angular/core/testing';
import { Cours } from 'src/app/cours';

@Pipe({
  name: 'filter'  
})
export class FilterPipe implements PipeTransform {

  transform(items: Cours[],module:string,hours:number, className:string): Cours[] {
    if (!items) return [];
    return items.filter(item => {
      let moduleMatch = true;

      let hoursMatch = true;
      let classMatch = true;

      if (module) {
        moduleMatch = item.prof_module.module.toLocaleLowerCase()===module.toLocaleLowerCase()
      }

      if (className) {
        classMatch = item.annee_classe.classe.libelle.toLowerCase() === className.toLowerCase();
      }
      // if (hours) {
      //   hoursMatch = item.hours >= hours;
      // }


      return moduleMatch ;
    });
  }

}
