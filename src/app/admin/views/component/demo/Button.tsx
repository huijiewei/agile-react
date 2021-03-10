import { VFC } from 'react';
import Button from '@shared/components/button/Button';
import ButtonGroup from '@shared/components/button/ButtonGroup';

const ComponentButton: VFC = () => {
  return (
    <div>
      <h5>按钮演示</h5>

      <div>
        <Button size={'sm'}>小按钮</Button>
        <Button>普通按钮</Button>
        <Button size={'lg'}>大按钮</Button>
        <Button size={'xl'}>超大按钮</Button>
      </div>
      <div>
        <Button isFullWidth={true}>全宽度按钮</Button>
      </div>
      <div>
        <Button isLoading={true}>正在加载</Button>
      </div>
      <div>
        <Button isLoading={true} variant={'outline'}>
          正在加载
        </Button>
      </div>
      <div>
        <Button>按钮</Button>
        &nbsp;
        <Button variant={'ghost'}>按钮</Button>
        &nbsp;
        <Button variant={'outline'}>按钮</Button>
        &nbsp;
        <Button variant={'link'}>按钮</Button>
      </div>
      <div>
        <Button>按钮</Button>
        &nbsp;
        <Button variant={'outline'}>按钮</Button>
        &nbsp;
        <Button variant={'link'}>按钮</Button>
        &nbsp;
        <Button variant={'ghost'}>按钮</Button>
      </div>
      <div>
        <Button colorScheme={'red'} size={'sm'}>
          按钮
        </Button>
        &nbsp;
        <Button colorScheme={'red'} size={'sm'} variant={'outline'}>
          按钮
        </Button>
        &nbsp;
        <Button colorScheme={'red'} size={'sm'} variant={'link'}>
          按钮
        </Button>
        &nbsp;
        <Button colorScheme={'red'} size={'sm'} variant={'ghost'}>
          按钮
        </Button>
      </div>
      <div>
        <Button colorScheme={'red'} size={'sm'} isDisabled>
          按钮
        </Button>
        &nbsp;
        <Button colorScheme={'red'} size={'sm'} isDisabled variant={'outline'}>
          按钮
        </Button>
        &nbsp;
        <Button colorScheme={'red'} size={'sm'} isDisabled variant={'link'}>
          按钮
        </Button>
        &nbsp;
        <Button colorScheme={'red'} size={'sm'} isDisabled variant={'ghost'}>
          按钮
        </Button>
      </div>
      <div>
        <Button size={'sm'} isDisabled>
          按钮
        </Button>
        &nbsp;
        <Button size={'sm'} isDisabled variant={'outline'}>
          按钮
        </Button>
        &nbsp;
        <Button size={'sm'} isDisabled variant={'link'}>
          按钮
        </Button>
        &nbsp;
        <Button size={'sm'} isDisabled variant={'ghost'}>
          按钮
        </Button>
      </div>
      <div>
        <Button isDisabled>按钮</Button>
        &nbsp;
        <Button isDisabled variant={'outline'}>
          按钮
        </Button>
        &nbsp;
        <Button isDisabled variant={'link'}>
          按钮
        </Button>
        &nbsp;
        <Button isDisabled variant={'ghost'}>
          按钮
        </Button>
      </div>
      <div>
        <Button isLoading={true} loadingText={'正在加载...'}>
          正在加载
        </Button>
      </div>
      <div>
        <ButtonGroup>
          <Button>测试</Button>
          <Button>测试</Button>
          <Button>测试</Button>
          <Button>测试</Button>
          <Button>测试</Button>
        </ButtonGroup>
      </div>
      <div>
        <ButtonGroup isAttached>
          <Button>测试</Button>
          <Button>测试</Button>
          <Button>测试</Button>
          <Button>测试</Button>
          <Button>测试</Button>
        </ButtonGroup>
      </div>
      <div>
        <ButtonGroup isAttached>
          <Button>测试</Button>
          <Button>测试</Button>
          <Button>测试</Button>
        </ButtonGroup>
      </div>
      <div>
        <ButtonGroup isAttached>
          <Button>测试</Button>
          <Button>测试</Button>
          <Button>测试</Button>
        </ButtonGroup>
      </div>
      <div>
        <ButtonGroup isAttached>
          <Button>测试</Button>
        </ButtonGroup>
      </div>
      <div>
        <ButtonGroup variant={'outline'} isAttached>
          <Button>测试</Button>
          <Button>测试</Button>
        </ButtonGroup>
      </div>
      <div>
        <ButtonGroup variant={'outline'} isAttached>
          <Button variant={'solid'}>测试</Button>
          <Button>测试</Button>
          <Button>测试</Button>
        </ButtonGroup>
      </div>
      <div>
        <ButtonGroup colorScheme={'gray'} variant={'outline'} isAttached>
          <Button variant={'solid'}>测试</Button>
          <Button>测试</Button>
          <Button>测试</Button>
        </ButtonGroup>
      </div>
      <div>
        <ButtonGroup colorScheme={'gray'} isAttached>
          <Button variant={'solid'}>测试</Button>
          <Button>测试</Button>
          <Button>测试</Button>
        </ButtonGroup>
      </div>
      <div>
        <ButtonGroup size={'sm'} colorScheme={'gray'} isAttached>
          <Button variant={'solid'}>测试</Button>
          <Button>测试</Button>
          <Button>测试</Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default ComponentButton;
