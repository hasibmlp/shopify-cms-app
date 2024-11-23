export async function getThemes(graphql) {
    try {
        const response = await graphql(`
        query getThemes {
          metaobjects(type: "themes", first: 10) {
            edges {
              node {
                id
                handle
                fields {
                  key
                  value
                }
              }
            }
          }
        }
      `);

        if (response.errors) {
            console.error("Error fetching themes metaobjects:", response.errors);
            return null;
        }

        const { data: { metaobjects } } = await response.json()

        const themes = metaobjects.edges.map(edge => edge.node);
        return themes;

    } catch (error) {
        console.error("An error occurred while fetching themes metaobjects:", error);
        return null;
    }
}

export async function createTheme(graphql, themeData) {

    const { title } = themeData;

    try {
        const response = await graphql(`
            mutation CreateMetaobject($type: String!, $fields: [MetaobjectFieldInput!]!) {
                metaobjectCreate(
                    metaobject: {
                        type: $type,
                        fields: $fields
                    }
                ) {
                    metaobject {
                        id
                        handle
                        fields {
                            key
                            value
                        }
                    }
                    userErrors {
                        field
                        message
                    }
                }
            }
    `, {
            variables: {
                type: "themes",
                fields: [
                    {
                        key: "name",
                        value: title
                    }
                ]
            }
        });

        const { data: { metaobjectCreate: { metaobject } } } = await response.json()

        return metaobject;
    } catch (error) {
        console.error("An error occurred while creating theme metaobject:", error);
        return null;
    }
}

export async function deleteTheme(graphql, id) {
  try {
    const response = await graphql(`
      mutation deleteMetaobject($id: ID!) {
        metaobjectDelete(id: $id) {
          deletedId
          userErrors {
            field
            message
          }
        }
      }
    `, {
      variables: {
        id
      }
    });

    if (response.errors) {
      console.error("Error deleting theme metaobject:", response.errors);
      return false;
    }

    return true;
  } catch (error) {
    console.error("An error occurred while deleting theme metaobject:", error);
    return false;
  }
}

export async function updateThemeName(graphql, id, newName) {
  try {
    const response = await graphql(`
      mutation UpdateMetaobject($id: ID!, $metaobject: MetaobjectUpdateInput!) {
        metaobjectUpdate(id: $id, metaobject: $metaobject) {
          metaobject {
            handle
            fields {
              key
              value
            }
          }
          userErrors {
            field
            message
            code
          }
        }
      }
    `, {
      variables: {
        id,
        metaobject: {
          fields: [
            {
              key: "name",
              value: newName
            }
          ]
        }
      }
    });

    if (response.errors || response.data?.metaobjectUpdate?.userErrors?.length > 0) {
      console.error("Error updating theme name:", 
        response.errors || response.data?.metaobjectUpdate?.userErrors
      );
      return false;
    }

    return true;
  } catch (error) {
    console.error("An error occurred while updating theme name:", error);
    return false;
  }
}
