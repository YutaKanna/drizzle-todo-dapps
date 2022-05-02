pragma solidity >=0.5.0 <0.8.0;

pragma experimental ABIEncoderV2;

contract CertificationInfo {
    uint256 public certificationsCount;
    // 認定資格情報を表現する構造体
    struct Certification {
        string registrationDate;
        string companyName;
        string certifiedBusiness;
        string registrationNumber;
        string detailedInfo;
    }
    Certification[] public _certifications;
    // 認定資格情報登録イベントの定義
    event RegisterCertificationInfo(
        string registrationDate,
        string companyName,
        string certifiedBusiness,
        string registrationNumber,
        string detailedInfo
    );

    // 認定資格情報を登録するメソッド
    function registerCertificationInfo(
        string memory registrationDate,
        string memory companyName,
        string memory certifiedBusiness,
        string memory registrationNumber,
        string memory detailedInfo
    ) public {
        // 引数に設定された認定資格情報をもとに構造体を作成し、認定資格情報の配列に追加する。
        // 同時に、認定資格情報の登録件数もインクリメントする。
        Certification memory certification = Certification({
            registrationDate: registrationDate,
            companyName: companyName,
            certifiedBusiness: certifiedBusiness,
            registrationNumber: registrationNumber,
            detailedInfo: detailedInfo
        });
        _certifications.push(certification);
        certificationsCount++;
        // 認定資格情報の登録イベントを実行する。
        emit RegisterCertificationInfo(
            registrationDate,
            companyName,
            certifiedBusiness,
            registrationNumber,
            detailedInfo
        );
    }

    // 登録された認定資格情報を全件取得するメソッド
    // 画面に表示する処理を考慮して、認定資格情報の構造体の各項目をそれぞれ配列形式でレスポンスする。
    function getAllCertificationInfos()
        public
        view
        returns (
            string[] memory registrationDates,
            string[] memory companyNames,
            string[] memory certifiedBusinesses,
            string[] memory registrationNumbers,
            string[] memory detailedInfos
        )
    {
        // レスポンス用の配列を初期化する。
        registrationDates = new string[](certificationsCount);
        companyNames = new string[](certificationsCount);
        certifiedBusinesses = new string[](certificationsCount);
        registrationNumbers = new string[](certificationsCount);
        detailedInfos = new string[](certificationsCount);
        // 登録された認定資格情報の件数分、レスポンス用の各配列に構造体の各項目の値を追加する。
        for (uint256 i = 0; i < certificationsCount; i++) {
            Certification storage certification = _certifications[i];
            registrationDates[i] = certification.registrationDate;
            companyNames[i] = certification.companyName;
            certifiedBusinesses[i] = certification.certifiedBusiness;
            registrationNumbers[i] = certification.registrationNumber;
            detailedInfos[i] = certification.detailedInfo;
        }
        return (
            registrationDates,
            companyNames,
            certifiedBusinesses,
            registrationNumbers,
            detailedInfos
        );
    }
}
