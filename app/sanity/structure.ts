import master from './schemas/misc/master';
import home from './schemas/pages/home';

const excluded = [home.name, master.name];

export const structure = (S: any) =>
  S.list()
    .title('Content')
    .items([getMasterItem(S), getHomeItem(S), ...getOtherItems(S)]);

function getMasterItem(S: any) {
  return S.listItem()
    .title(master.title)
    .icon(master.icon)
    .child(S.document().schemaType(master.name).documentId(master.name));
}

function getHomeItem(S: any) {
  return S.listItem()
    .title(home.title)
    .icon(home.icon)
    .child(S.document().schemaType(home.name).documentId(home.name));
}

function getOtherItems(S: any) {
  return S.documentTypeListItems().filter((builder: any) => {
    return !excluded.includes(builder.spec.id);
  });
}
