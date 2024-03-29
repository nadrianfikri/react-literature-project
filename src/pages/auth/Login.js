import Button from '../../components/atoms/Button';
import { DirectLink } from '../../components/atoms/Form';
import { Modal, ModalTitle, Animate } from '../../components/molecules/Modal';

export default function Login(props) {
  return (
    <Animate show={props.show}>
      <Modal>
        <ModalTitle text="Sign In" onClose={props.onClose} />
        <form action="/" method="post" onSubmit={props.onSubmit}>
          <div className="space-y-5 w-72">{props.children}</div>
          <Button type="submit" text="Sign In" className="bg-danger text-white w-full mt-8" />
          <DirectLink text="Don't have an account ? Klik " textLink="Here" onClick={props.onDirect} />
        </form>
      </Modal>
    </Animate>
  );
}
