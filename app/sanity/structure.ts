import home from './schemas/pages/home';

const excluded = [home.name];

export const structure = (S: any) =>
  S.list()
    .title('Content')
    .items([getHomeItem(S), ...getOtherItems(S)]);

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
