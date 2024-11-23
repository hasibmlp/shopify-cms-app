import { CSS } from '@dnd-kit/utilities';
import styles from './section-list-v2.module.css';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { closestCorners, DndContext } from '@dnd-kit/core';

const items = [
    { id: '121', title: 'test 1' },
    { id: '122', title: 'test 2' },
    { id: '123', title: 'test 3' },
];

export default function SectionListV2() {
    return (
        <DndContext collisionDetection={closestCorners}>
            <Droppable items={items} />
        </DndContext>
    );
}

function Droppable({ items }) {
    return (
        <div className={styles.container}>
            <SortableContext
                items={items}
                strategy={verticalListSortingStrategy}
            >
                {items.map(i => (
                    <Draggable key={i.id} id={i.id} title={i.title} />
                ))}
            </SortableContext>
        </div>
    );
}

function Draggable({ id, title }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    };

    return (
        <div 
            ref={setNodeRef} 
            {...attributes} 
            {...listeners} 
            style={style}
            className={styles.item}
        >
            {title}
        </div>
    );
}