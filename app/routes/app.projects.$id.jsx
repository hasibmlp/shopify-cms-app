import React, { useState } from 'react';
import { useParams, useNavigate, useActionData, Form } from '@remix-run/react';
import { json, redirect } from '@remix-run/node';
import { Modal } from '@shopify/app-bridge-react';
import { Layout, Card, TextField, Button, Page, InlineGrid } from '@shopify/polaris';
import { createTheme } from '../servers/themes.server';
import { authenticate } from "../shopify.server";
import SectionListV2 from '../components/SectionListV2';

export async function action({ request }) {
    const { admin } = await authenticate.admin(request);
    const formData = await request.formData();
    const title = formData.get('title');
    const themeData = { title };

    const newTheme = await createTheme(admin.graphql, themeData);

    if (!newTheme) {
        return json({ error: 'Failed to create theme' }, { status: 500 });
    }

    return redirect(`/app/projects/${newTheme.handle}`);
}

export default function ProjectCustomize() {
    const { id } = useParams();
    const navigate = useNavigate();
    const actionData = useActionData();
    const [form, setForm] = useState({ title: '' });
    const [formState, setFormState] = useState(form);
    const [sections, setSections] = useState([
        { id: 'section-1', content: 'Header' },
        { id: 'section-2', content: 'Footer' },
        { id: 'section-3', content: 'Main Content' },
    ]);

    const handleClose = () => {
        navigate('/app');
    };

    const handleNameChange = (value) => {
        setForm({ title: value });
    };

    const handleSave = () => {
        setFormState({ ...form });
        document.getElementById("projectForm").requestSubmit();
    };

    const isDirty = JSON.stringify(form) !== JSON.stringify(formState);

    if (id === 'new') {
        return (
            <Page
                backAction={{ content: 'Settings', url: '/app/' }}
                title="Create New Project"
                primaryAction={
                    <Button variant="primary" onClick={handleSave} disabled={!isDirty}>
                        Save
                    </Button>
                }
            >
                <Layout>
                    <Layout.Section>
                        <Card sectioned>
                            <Form method="post" id="projectForm">
                                <TextField
                                    label="Name"
                                    name="title"
                                    value={form.title}
                                    onChange={handleNameChange}
                                    placeholder="Enter project name"
                                    autoComplete="off"
                                    error={actionData?.error}
                                />
                            </Form>
                        </Card>
                    </Layout.Section>
                </Layout>
            </Page>
        );
    }

    return (
        <Modal
            open
            onHide={handleClose}
            variant="max"
        >
            <div style={{ padding: '1rem', height: '100vh', boxSizing: 'border-box' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem' }}>
                    <h1>Edit Project</h1>
                    <Button primary onClick={() => console.log('Save action')}>
                        Save
                    </Button>
                </div>
                <InlineGrid columns="20% 80%" gap="200">
                    {/* <SectionList sections={sections} setSections={setSections} /> */}

                    <SectionListV2 />


                    <Card sectioned style={{ height: '100%', overflowY: 'auto' }}>
                        <div style={{ height: '85vh' }}>
                            {/* Right panel content */}
                        </div>
                    </Card>
                </InlineGrid>
            </div>
        </Modal>
    );
}