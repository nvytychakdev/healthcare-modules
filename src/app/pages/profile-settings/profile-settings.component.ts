import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MODULE_UNITS } from '@healthcare/core';
import { ModuleStateService } from '../../../../projects/core/src/lib/services/module-state.service';
import { LayoutSectionComponent } from '../../components/layout-section/layout-section.component';

@Component({
  standalone: true,
  selector: 'app-profile-settings',
  imports: [LayoutSectionComponent, FormsModule],
  templateUrl: './profile-settings.component.html',
  styleUrl: './profile-settings.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileSettingsComponent {
  private readonly moduleState = inject(ModuleStateService);

  get temperatureUnits() {
    return Array.from(MODULE_UNITS.temperature.values()).map((unit) => ({
      label: unit.name,
      value: unit.id,
    }));
  }

  get weightUnits() {
    return Array.from(MODULE_UNITS.weight.values()).map((unit) => ({
      label: unit.name,
      value: unit.id,
    }));
  }

  temperature =
    this.moduleState.preferredUnits.get('Temperature') || this.temperatureUnits.at(0)?.value;
  weight = this.moduleState.preferredUnits.get('Weight') || this.weightUnits.at(0)?.value;

  onTemperatureChange(value: string) {
    console.log(value);
    this.moduleState.setPreferredUnits('Temperature', value);
  }

  onWeightChange(value: string) {
    this.moduleState.setPreferredUnits('Weight', value);
  }
}
