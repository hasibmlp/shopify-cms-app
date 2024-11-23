import React from 'react';
import { useLoaderData, useNavigate, useSubmit } from '@remix-run/react';
import {
  Page,
  Layout,
  Card,
  Button,
  Text,
  BlockStack,
  InlineStack,
  EmptyState,
  ButtonGroup,
  Thumbnail,
  Popover,
  ActionList,
  Icon,
  Box,
  TextField
} from '@shopify/polaris';
import { Modal, TitleBar, useAppBridge } from '@shopify/app-bridge-react';
import { MenuHorizontalIcon } from '@shopify/polaris-icons';
import { getThemes, deleteTheme, updateThemeName } from '../servers/themes.server';
import { authenticate } from "../shopify.server";
import { json } from '@remix-run/node';
import { ModalContent, Redirect } from '@shopify/app-bridge/actions';

export async function loader({ request, params }) {
  const { admin } = await authenticate.admin(request);
  const themes = await getThemes(admin.graphql);
  return { themes };
}

export async function action({ request }) {
  const { admin } = await authenticate.admin(request);
  const formData = await request.formData();
  const themeId = formData.get('themeId');
  const action = formData.get('action');

  if (request.method === 'DELETE') {
    await deleteTheme(admin.graphql, themeId);
    return json({ success: true });
  }

  if (action === 'rename') {
    const newName = formData.get('newName');
    await updateThemeName(admin.graphql, themeId, newName);
    return json({ success: true });
  }

  return null;
}

const HomePage = () => {
  const app = useAppBridge();
  const navigate = useNavigate();
  const submit = useSubmit();
  const { themes } = useLoaderData();
  const [activePopoverId, setActivePopoverId] = React.useState(null);
  const [themeToDelete, setThemeToDelete] = React.useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [isRenameModalOpen, setIsRenameModalOpen] = React.useState(false);
  const [themeToRename, setThemeToRename] = React.useState(null);

  const handleCreateNewProject = () => {
    navigate('/app/projects/new');
  };

  const handleCustomize = (handle) => {
    const themeId = '1234567890';
    window.open(`https://589b-2-50-182-21.ngrok-free.app/edit/${themeId}`, '_top');
  };

  const togglePopover = (id) => {
    setActivePopoverId(activePopoverId === id ? null : id);
  };

  const handleDeleteClick = (theme) => {
    setThemeToDelete(theme);
    setIsDeleteModalOpen(true);
    setActivePopoverId(null);
  };

  const handleDeleteConfirm = () => {
    if (themeToDelete) {
      const formData = new FormData();
      formData.append('themeId', themeToDelete.id);
      submit(formData, { method: 'DELETE' });
    }
    setIsDeleteModalOpen(false);
    setThemeToDelete(null);
  };

  const handleModalClose = () => {
    setIsDeleteModalOpen(false);
    setThemeToDelete(null);
  };

  const handleRenameClick = (theme) => {
    setThemeToRename(theme);
    setIsRenameModalOpen(true);
    setActivePopoverId(null);
  };

  const handleRenameConfirm = () => {
    if (themeToRename) {
      const formData = new FormData();
      formData.append('themeId', themeToRename.id);
      formData.append('action', 'rename');
      formData.append('newName', themeToRename.newName);
      submit(formData, { method: 'POST' });
    }
    setIsRenameModalOpen(false);
    setThemeToRename(null);
  };

  const handleRenameModalClose = () => {
    setIsRenameModalOpen(false);
    setThemeToRename(null);
  };

  if (!themes || themes.length === 0) {
    return (
      <Page>
        <Layout>
          <Layout.Section>
            <Card>
              <EmptyState
                heading="Create your first project"
                action={{
                  content: 'Create New Project',
                  onAction: handleCreateNewProject,
                }}
                image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
              >
                <p>Start building your project by creating a new one.</p>
              </EmptyState>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    );
  }

  return (
    <Page
      title="Projects"
      primaryAction={{ content: 'Create New Project', onAction: handleCreateNewProject }}
    >
      <Layout>
        <Layout.Section>
          <Card padding="0">
            <Box padding="400">
              <BlockStack>
                <InlineStack align="space-between" blockAlign='center'>
                  <Text variant="headingMd" as="h2" fontWeight="bold">Theme Library</Text>
                  <Button onClick={handleCreateNewProject}>Add theme</Button>
                </InlineStack>
                <Text as="p" variant="bodyMd" color="subdued">
                  Manage and customize your themes to create unique experiences for your store
                </Text>
              </BlockStack>
            </Box>

            <BlockStack>
              {themes.map((theme) => {
                const { id, handle, fields } = theme;
                const nameField = fields.find(field => field.key === 'name');
                const name = nameField ? nameField.value : 'Unnamed Project';
                const lastSaved = new Date().toLocaleDateString();
                const version = '1.0.0';

                return (
                  <Box
                    key={id}
                    padding="400"
                    borderBlockStartWidth="025"
                    borderColor="border"
                  >
                    <InlineStack align="space-between" blockAlign="center">
                      {/* Content Side */}
                      <InlineStack gap="400" blockAlign="center">
                        <Thumbnail
                          source="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=373"
                          alt={name}
                          size="large"
                        />
                        <BlockStack gap="100">
                          <Text variant="headingSm" as="h3">{name}</Text>
                          <Text variant="bodySm" color="subdued">
                            Last saved: {lastSaved}
                          </Text>
                          <Text variant="bodySm" color="subdued">
                            Version: {version}
                          </Text>
                        </BlockStack>
                      </InlineStack>

                      {/* Actions Side */}
                      <ButtonGroup>
                        <Popover
                          active={activePopoverId === id}
                          activator={
                            <Button
                              icon={<Icon source={MenuHorizontalIcon} />}
                              onClick={() => togglePopover(id)}
                            />
                          }
                          onClose={() => togglePopover(id)}
                        >
                          <ActionList
                            items={[
                              { 
                                content: 'Rename',
                                onAction: () => handleRenameClick(theme)
                              },
                              { content: 'Duplicate' },
                              {
                                content: 'Delete',
                                destructive: true,
                                onAction: () => handleDeleteClick(theme)
                              },
                            ]}
                          />
                        </Popover>
                        <Button>Publish</Button>
                        <Button onClick={() => handleCustomize(handle)}>
                          Customize
                        </Button>
                      </ButtonGroup>
                    </InlineStack>
                  </Box>
                );
              })}
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>

      <Modal
        id="delete-theme-modal"
        open={isDeleteModalOpen}
        onHide={handleModalClose}
      >
        <Box paddingInline="400" paddingBlock="400" paddingBlockEnd="800">
          <Text as="p">
            Are you sure you want to delete "{themeToDelete?.fields.find(f => f.key === 'name')?.value}"?
            This action cannot be undone.
          </Text>
        </Box>
        <TitleBar title="Delete theme">
          <button onClick={handleModalClose}>Cancel</button>
          <button variant="primary" tone="critical" onClick={handleDeleteConfirm}>Delete</button>
        </TitleBar>

      </Modal>

      <Modal
        id="rename-theme-modal"
        open={isRenameModalOpen}
        onHide={handleRenameModalClose}
      >
        <Box paddingInline="400" paddingBlock="400" paddingBlockEnd="800">
          <BlockStack gap="400">
            <Text as="p">
              Enter a new name for "{themeToRename?.fields.find(f => f.key === 'name')?.value}"
            </Text>
            <TextField
              label="Theme name"
              value={themeToRename?.newName || ''}
              onChange={(value) => setThemeToRename(prev => ({ ...prev, newName: value }))}
              autoComplete="off"
            />
          </BlockStack>
        </Box>
        <TitleBar title="Rename theme">
          <button onClick={handleRenameModalClose}>Cancel</button>
          <button variant="primary" onClick={handleRenameConfirm}>Rename</button>
        </TitleBar>
      </Modal>
    </Page>
  );
};

export default HomePage;
