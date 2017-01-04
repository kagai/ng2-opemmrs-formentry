import { Injectable } from '@angular/core';
// import { AbstractControl } from '@angular/forms';

import { LeafNode, GroupNode, ArrayNode, NodeBase } from './form-node';
import { QuestionBase, NestedQuestion, RepeatingQuestion, QuestionGroup } from '../question-models/models';
import { FormControlService } from './form-control.service';
import { QuestionFactory } from './question.factory';
import { AfeFormGroup, AfeControlType, AfeFormArray } from '../../abstract-controls-extension/control-extensions';
import { ControlRelationsFactory } from './control-relations.factory';

import { Form } from './form';

@Injectable()
export class FormFactory {
    public hd: any = {
        getValue: () => {
            return 20;
        }
    };

    constructor(public controlService: FormControlService,
      public questionFactroy: QuestionFactory, public controlRelationsFactory: ControlRelationsFactory) {
    }

    createForm(schema: any): Form {
        let form: Form = new Form(schema, this, this.questionFactroy);
        let question = this.questionFactroy.createQuestionModel(schema);
        form.rootNode = this.createNode(question, null, null, form) as GroupNode;

        this.buildRelations(form.rootNode);
        return form;
    }

    buildRelations(rootNode: GroupNode) {
      this.controlRelationsFactory.buildRelations(rootNode);
    }

    createNode(question: QuestionBase | NestedQuestion,
        parentNode?: GroupNode, parentControl?: AfeFormGroup, form?: Form): NodeBase {
        let node: NodeBase = null;
        if (question instanceof NestedQuestion) {
            if (question instanceof RepeatingQuestion) {
                node = this.createArrayNode(question, parentNode, parentControl, form);
            } else {
                node = this.createGroupNode(question, parentNode, parentControl, form);
            }
        } else {
            node = this.createLeafNode(question, parentNode, parentControl, form);
        }
        return node;
    }

    createLeafNode(question: QuestionBase,
        parentNode: GroupNode, parentControl?: AfeFormGroup, form?: Form): LeafNode {
        let controlModel = this.controlService.generateControlModel(question, parentControl, false);
        return new LeafNode(question, controlModel, null, form);
    }

    createGroupNode(question: NestedQuestion, parentNode?: GroupNode,
        parentControl?: AfeFormGroup, form?: Form): GroupNode {
        let controlModel = this.controlService.generateControlModel(question, parentControl, false) as AfeFormGroup;
        let groupNode = new GroupNode(question, controlModel, null, form);
        this.createNodeChildren(question, groupNode, (controlModel || parentControl), form);
        return groupNode;
    }

    createArrayNode(question: NestedQuestion, parentNode?: GroupNode,
        parentControl?: AfeFormGroup, form?: Form): ArrayNode {
        let controlModel = this.controlService.generateControlModel(question, parentControl, false) as AfeFormGroup;
        let arrayNode = new ArrayNode(question, controlModel, parentControl, this, form);
        arrayNode.createChildFunc = this.createArrayNodeChild;
        arrayNode.removeChildFunc = this.removeArrayNodeChild;
        return arrayNode;
    }

    createNodeChildren(question: NestedQuestion, node: GroupNode,
        parentControl?: AfeFormGroup, form?: Form): any {
        question.questions.forEach(element => {
            let child = this.createNode(element, node, parentControl, form);
            node.setChild(element.key, child);
        });
        return node.children;
    }


    createArrayNodeChild(question: RepeatingQuestion,
        node: ArrayNode, factory?: FormFactory): GroupNode {
        if (factory === null || factory === undefined) {
            factory = this;
        }
        let groupQuestion: QuestionGroup =
            new QuestionGroup({ key: question.key, type: 'group', extras: question.extras, label: '', questions: question.questions });

        if (question.controlType === AfeControlType.None) {
            groupQuestion.controlType = question.controlType;
        }

        let group = factory.createGroupNode(groupQuestion, null, null, node.form);
        node.children.push(group);

        if (node.control instanceof AfeFormArray) {
            let nodeControl = node.control as AfeFormArray;
            nodeControl.setControl(nodeControl.controls.length, group.control);
        }

        return group;
    }

    removeArrayNodeChild(index: number, node: ArrayNode) {
        let nodeToRemove = node.children[index];

        node.children.splice(index, 1);
        if (node.control !== null || node.control !== undefined) {
            if (node.control instanceof AfeFormArray) {
                let control = node.control as AfeFormArray;
                let controlIndexToRemove = control.controls.indexOf(nodeToRemove.control);
                if (controlIndexToRemove >= 0) {
                    control.removeAt(controlIndexToRemove);
                }
            }
        }
    }
}