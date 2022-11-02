<script setup>
  import Button from '../../components/button/Button.vue'
  import IconBee from '@carbon/icons-vue/lib/bee/20'
</script>

<style scoped lang="postcss">
</style>

# ![button](/assets/images/img-guide-button.svg) Button

## Usage
Buttons are used primarily for actions, such as “Add”, “Continue”, “Cancel”, or “Save”. Ghost and Link buttons, which look similar to text hyperlink, are used for less important or less commonly used actions, such as “Learn More” or “Continue Later”

## Button by type

##### Default button text

<div>
  <Button>Button Text</Button>
</div>
<div class="flex pt-5 pb-8 text-sm text-body-75">
  <div class="w-3/4">
    Usage : Use to highlight the most important actions in any experience. Don’t use more than one default button in a section or screen.
  </div>
</div>

##### Default button icon
<div>
  <Button icon><IconBee /></Button>
</div>
<div class="flex pt-5 pb-6 text-sm text-body-75">
  <div class="w-3/4">
    Usage : Use to highlight the most important actions in any experience. Icon button usually replacing button text to fill small space and choosen icon that resemble the function of the button.
  </div>
</div>

##### Default button icon text
<div class="flex space-x-3">
  <Button icon><IconBee /> Button Text</Button>
  <Button icon>Button Text <IconBee /></Button>
</div>
<div class="flex pt-5 pb-8 text-sm text-body-75">
  <div class="w-3/4">
    Usage : Use to highlight the most important actions in any experience.
    This button will be displayed before or after the text
  </div>
</div>

##### Outline button Text
<div class="flex space-x-3">
  <Button variant="outline">Button Text</Button>
</div>
<div class="flex pt-5 pb-8 text-sm text-body-75">
  <div class="w-3/4">
    Usage : Used most in the interface. Only use another style
    if a button requires more or less visual weight.
  </div>
</div>

##### Link button Text
<div class="flex space-x-3">
  <Button variant="link">Button Text</Button>
</div>
<div class="flex pt-5 pb-8 text-sm text-body-75">
  <div class="w-3/4">
    Usage : Use a link button to navigate to another page.
    These should open in the same window unless information may be
    lost (for example, when someone is filling out a form), or when
    the destination is an external site (for example, a knowledge base article).
  </div>
</div>

## Button by state

##### Normal State button text

<div>
  <Button>Button Text</Button>
</div>
<div class="flex pt-5 pb-8 text-sm text-body-75">
  <div class="w-3/4">
    Usage : Use for default state of the button.
  </div>
</div>

##### Hover State button text

<div>
  <Button>Hover Me</Button>
</div>
<div class="flex pt-5 pb-8 text-sm text-body-75">
  <div class="w-3/4">
    Usage : Use for actions that currently being hovered.
    The button will remain at hovering state until user move the crusor to another area.
  </div>
</div>

##### Focus State button text

<div>
  <Button>Press Me</Button>
</div>
<div class="flex pt-5 pb-8 text-sm text-body-75">
  <div class="w-3/4">
    Usage : Use for actions that currently being pressed.
    The button will remail pressed until user release current button.
  </div>
</div>

##### Muted State button text

<div>
  <Button disabled>Button Text</Button>
</div>
<div class="flex pt-5 pb-8 text-sm text-body-75">
  <div class="w-3/4">
    Usage : Use for actions that aren’t currently available.
    The surrounding interface should make it clear why the button is
    disabled and what needs to be done to enable it.
  </div>
</div>

## Button by Size

##### Large Size button text
<div class="flex space-x-3">
  <Button size="lg">Button Text</Button>
</div>
<div class="flex pt-5 pb-8 text-sm text-body-75">
  <div class="w-3/4">
    Usage : Use for actions that aren’t currently available.
    The surrounding interface should make it clear why the button is
    disabled and what needs to be done to enable it.
  </div>
</div>

##### Medium Size button text
<div class="flex space-x-3">
  <Button size="md">Button Text</Button>
</div>
<div class="flex pt-5 pb-8 text-sm text-body-75">
  <div class="w-3/4">
    Usage : Default size button that used in all over component.
    Used in component that have a big space.
  </div>
</div>

##### Small Size button text
<div class="flex space-x-3">
  <Button size="sm">Button Text</Button>
</div>
<div class="flex pt-5 pb-8 text-sm text-body-75">
  <div class="w-3/4">
    Usage : Small size button usually used in component that
    have smaller space like contextual bar, empty state and else
  </div>
</div>

##### Xsmall Size button text
<div class="flex space-x-3">
  <Button size="xs">Button Text</Button>
</div>
<div class="flex pt-5 pb-8 text-sm text-body-75">
  <div class="w-3/4">
    Usage : Xsmall size button usually used in component
    that have smallest space like table and else.
  </div>
</div>
