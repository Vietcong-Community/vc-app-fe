import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  title: {
    id: 'app.containers.Admin.CreateMap.title',
    defaultMessage: 'Admin - Vytvoření mapy',
  },
  createSuccess: {
    id: 'app.containers.Admin.CreateMap.createSuccess',
    defaultMessage: 'Mapa byla úspěšně vytvořena.',
  },
  createFailed: {
    id: 'app.containers.Admin.CreateMap.createFailed',
    defaultMessage: 'Vytvoření mapy selhalo.',
  },
  name: {
    id: 'app.containers.Admin.CreateMap.name',
    defaultMessage: 'Název',
  },
  official: {
    id: 'app.containers.Admin.CreateMap.official',
    defaultMessage: 'Je mapa oficiální?',
  },
  officialTable: {
    id: 'app.containers.Admin.CreateMap.officialTable',
    defaultMessage: 'Oficiální',
  },
  yes: {
    id: 'app.containers.Admin.CreateMap.yes',
    defaultMessage: 'Ano',
  },
  no: {
    id: 'app.containers.Admin.CreateMap.no',
    defaultMessage: 'Ne',
  },
  idTable: {
    id: 'app.containers.Admin.CreateMap.idTable',
    defaultMessage: 'ID',
  },
  submitButton: {
    id: 'app.containers.Admin.CreateMap.submitButton',
    defaultMessage: 'Vytvořit',
  },
  cancelButton: {
    id: 'app.containers.Admin.CreateMap.cancelButton',
    defaultMessage: 'Zrušit',
  },
  existingMaps: {
    id: 'app.containers.Admin.CreateMap.existingMaps',
    defaultMessage: 'Existující mapy',
  },
  mapBreadcrumb: {
    id: 'app.containers.Admin.CreateMap.mapBreadcrumb',
    defaultMessage: 'Vytvoření mapy',
  },
  insufficientRights: {
    id: 'app.containers.Admin.CreateMap.insufficientRights',
    defaultMessage: 'Nemáte dostatečné oprávnění.',
  },
});
