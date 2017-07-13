import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdTabsModule, MdIconModule, OVERLAY_PROVIDERS } from '@angular/material';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { FormErrorsService } from './services';
import { HammerConfig } from './helpers/hammer-config';
import { FormControlService } from './form-factory/form-control.service';
import { ValidationFactory } from './form-factory/validation.factory';
import { FormRendererComponent } from './form-renderer/form-renderer.component';
import { ErrorRendererComponent } from './error-renderer/error-renderer.component';
import { HistoricalValueDirective } from './directives/historical-value-directive';
import { HistoricalFieldHelperService } from './helpers/historical-field-helper-service';
import { SelectModule } from '../components/select';
import { RemoteFileUploadModule } from '../components/file-upload/file-upload.module';
import { DateTimePickerModule } from '../components/date-time-picker';
import { AfeNgSelectComponent } from '../components/afe-ng-select.component';
import { HidersDisablersFactory } from './form-factory/hiders-disablers.factory';
import { ExpressionRunner } from './expression-runner/expression-runner';
import { JsExpressionHelper } from './helpers/js-expression-helper';
import { FormSchemaCompiler } from './services/form-schema-compiler.service';
import { FormFactory } from './form-factory/form.factory';
import { QuestionFactory } from './form-factory/question.factory';
import { ControlRelationsFactory } from './form-factory/control-relations.factory';
import { EncounterAdapter, PersonAttribuAdapter, OrderValueAdapter, ObsValueAdapter, ObsAdapterHelper } from './value-adapters';
import { RemoteSelectModule } from '../components/remote-select/remote-select.module';
import { DataSources } from './data-sources/data-sources';
import { AppointmentsOverviewComponent } from '../components/appointments-overview/appointments-overview.component';
var FormEntryModule = (function () {
    function FormEntryModule() {
    }
    FormEntryModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        CollapseModule.forRoot(),
                        SelectModule,
                        DateTimePickerModule,
                        RemoteSelectModule,
                        RemoteFileUploadModule,
                        BrowserAnimationsModule,
                        MdIconModule,
                        MdTabsModule
                    ],
                    declarations: [
                        FormRendererComponent,
                        AfeNgSelectComponent,
                        AppointmentsOverviewComponent,
                        HistoricalValueDirective,
                        ErrorRendererComponent
                    ],
                    providers: [
                        OVERLAY_PROVIDERS,
                        FormBuilder,
                        FormControlService,
                        FormErrorsService,
                        ValidationFactory,
                        HidersDisablersFactory,
                        ExpressionRunner,
                        JsExpressionHelper,
                        HistoricalFieldHelperService,
                        FormSchemaCompiler,
                        FormFactory,
                        QuestionFactory,
                        ValidationFactory,
                        ControlRelationsFactory,
                        ObsAdapterHelper,
                        ObsValueAdapter,
                        EncounterAdapter,
                        PersonAttribuAdapter,
                        OrderValueAdapter,
                        DataSources,
                        {
                            provide: HAMMER_GESTURE_CONFIG,
                            useClass: HammerConfig
                        }
                    ],
                    exports: [FormRendererComponent, AfeNgSelectComponent,
                        ErrorRendererComponent, DateTimePickerModule]
                },] },
    ];
    /** @nocollapse */
    FormEntryModule.ctorParameters = function () { return []; };
    return FormEntryModule;
}());
export { FormEntryModule };
//# sourceMappingURL=form-entry.module.js.map