import React from 'react';
import { Button, Card, InlineStack, Icon } from '@shopify/polaris';
import { DeleteIcon, DragHandleIcon } from '@shopify/polaris-icons';
import styles from './section-list.module.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export default function SectionList({ sections, setSections }) {
    const onDragEnd = (result) => {
        if (!result.destination) return;

        const reorderedSections = Array.from(sections);
        const [movedSection] = reorderedSections.splice(result.source.index, 1);
        reorderedSections.splice(result.destination.index, 0, movedSection);

        setSections(reorderedSections);
    };

    const addSection = (index) => {
        const newSection = { id: `section-${sections.length + 1}`, content: 'New Section' };
        const updatedSections = [...sections];
        updatedSections.splice(index + 1, 0, newSection);
        setSections(updatedSections);
    };

    const deleteSection = (index) => {
        const updatedSections = [...sections];
        updatedSections.splice(index, 1);
        setSections(updatedSections);
    };

    return (
        <Card sectioned style={{ height: '100%', overflowY: 'auto' }}>
            <div
                className={styles.sectionWrapper}
            >
                <div
                    className={styles.sectionItem}
                >
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="droppable">
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    style={{ padding: 8, width: 250 }}
                                >
                                    {sections.map((item, index) => (
                                        <Draggable key={item.id} draggableId={item.id} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={{
                                                        userSelect: 'none',
                                                        padding: 16,
                                                        margin: '0 0 8px 0',
                                                        backgroundColor: '#fff',
                                                        ...provided.draggableProps.style,
                                                    }}
                                                >
                                                    <InlineStack align='space-between' blockAlign='center'>
                                                        <InlineStack gap="200" blockAlign='center'>
                                                            <div
                                                                className={styles.dragHandle}
                                                                {...provided.dragHandleProps}
                                                            >
                                                                <Icon source={DragHandleIcon} />
                                                            </div>
                                                            <span>{item.content}</span>
                                                        </InlineStack>
                                                        {/* <Button
                                                            icon={DeleteIcon}
                                                            accessibilityLabel={`Delete ${'test'}`}
                                                            onClick={() => deleteSection(index)}
                                                        /> */}
                                                    </InlineStack>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
                {/* <button
                    onClick={() => addSection(index)}
                    className={styles.addSectionButton}
                >
                    <span className={styles.plusIcon}>
                        +
                    </span>
                </button> */}
            </div>
        </Card>
    );
} 